import csv
import json
import os
from collections import Counter, defaultdict

DATA_DIR = "data/kaggle-restaurants/data"
OUTPUT = "dashboard_data.json"
JS_OUTPUT = "assets/dashboard-data.js"

# 데이터셋의 Latitude/Longitude는 도시와 무관한 난수라 지도에 쓸 수 없다.
# 도시 위치는 실제 좌표를 직접 지정한다.
CITY_COORDS = {
    "New York": (40.7128, -74.0060),
    "Los Angeles": (34.0522, -118.2437),
    "London": (51.5074, -0.1278),
    "Manchester": (53.4808, -2.2426),
    "Tokyo": (35.6762, 139.6503),
    "Osaka": (34.6937, 135.5023),
    "Delhi": (28.6139, 77.2090),
    "Mumbai": (19.0760, 72.8777),
    "Sao Paulo": (-23.5505, -46.6333),
    "Rio de Janeiro": (-22.9068, -43.1729),
}


def read_csv(name):
    with open(f"{DATA_DIR}/{name}", encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def avg(values):
    return round(sum(values) / len(values), 2) if values else 0


restaurants = read_csv("restaurants.csv")
menus = read_csv("menus.csv")
cities = read_csv("cities.csv")

by_city = defaultdict(list)
by_cuisine = defaultdict(list)
by_country = defaultdict(list)
for r in restaurants:
    by_city[r["City"]].append(r)
    by_cuisine[r["Cuisine"]].append(r)
    by_country[r["Country"]].append(r)

menu_prices_by_city = defaultdict(list)
restaurant_city = {r["Restaurant_ID"]: r["City"] for r in restaurants}
category_counter = Counter()
for m in menus:
    category_counter[m["Food_category"]] += 1
    city = restaurant_city.get(m["Restaurant_ID"])
    if city:
        menu_prices_by_city[city].append(float(m["Price"]))

city_rows = sorted(
    (
        {
            "city": city,
            "country": rows[0]["Country"],
            "count": len(rows),
            "avg_rating": avg([float(r["Average_rating"]) for r in rows]),
            "avg_menu_price": avg(menu_prices_by_city.get(city, [])),
            "lat": CITY_COORDS[city][0],
            "lon": CITY_COORDS[city][1],
        }
        for city, rows in by_city.items()
    ),
    key=lambda d: d["count"],
    reverse=True,
)

# 각 레스토랑 좌표가 자기 도시 반경 2도 안에 들어오는 비율 — 좌표 신뢰도 점검
near_own_city = sum(
    1
    for r in restaurants
    if abs(float(r["Latitude"]) - CITY_COORDS[r["City"]][0]) <= 2
    and abs(float(r["Longitude"]) - CITY_COORDS[r["City"]][1]) <= 2
)
coord_check = {
    "checked": len(restaurants),
    "near_own_city": near_own_city,
    "ratio": round(near_own_city / len(restaurants) * 100, 2),
}

cuisine_rows = sorted(
    (
        {
            "cuisine": cuisine,
            "count": len(rows),
            "avg_rating": avg([float(r["Average_rating"]) for r in rows]),
        }
        for cuisine, rows in by_cuisine.items()
    ),
    key=lambda d: d["count"],
    reverse=True,
)

opening_counter = Counter()
for r in restaurants:
    decade = int(r["Opening_year"]) // 10 * 10
    opening_counter[decade] += 1

price_level_counter = Counter(r["Price_level"] for r in restaurants)

menu_prices_by_restaurant = defaultdict(list)
for m in menus:
    menu_prices_by_restaurant[m["Restaurant_ID"]].append(float(m["Price"]))

by_price_level = defaultdict(list)
for r in restaurants:
    by_price_level[r["Price_level"]].append(r)

price_level_rows = [
    {
        "level": f"$" * int(lv),
        "count": len(rows),
        "avg_rating": avg([float(r["Average_rating"]) for r in rows]),
        "avg_menu_price": avg(
            [
                p
                for r in rows
                for p in menu_prices_by_restaurant.get(r["Restaurant_ID"], [])
            ]
        ),
    }
    for lv, rows in sorted(by_price_level.items())
]

rating_buckets = Counter()
for r in restaurants:
    rating = float(r["Average_rating"])
    bucket = min(int(rating * 2) / 2, 4.5)
    rating_buckets[bucket] += 1
rating_distribution = [
    {"bucket": f"{b:.1f}–{b + 0.5:.1f}", "count": rating_buckets[b]}
    for b in sorted(rating_buckets)
]

by_chain = defaultdict(list)
for r in restaurants:
    by_chain[r["Chain_local"]].append(r)

chain_by_city = {
    kind: [
        sum(1 for r in rows if r["City"] == c["city"]) for c in city_rows
    ]
    for kind, rows in by_chain.items()
}

cuisine_price = defaultdict(list)
for r in restaurants:
    cuisine_price[r["Cuisine"]].extend(
        menu_prices_by_restaurant.get(r["Restaurant_ID"], [])
    )
cuisine_price_rows = sorted(
    ({"cuisine": c, "avg_price": avg(p)} for c, p in cuisine_price.items()),
    key=lambda d: d["avg_price"],
    reverse=True,
)

top_rated = sorted(
    restaurants,
    key=lambda r: (float(r["Average_rating"]), int(r["Review_count"])),
    reverse=True,
)[:10]

result = {
    "summary": {
        "total_restaurants": len(restaurants),
        "total_menu_items": len(menus),
        "total_cities": len(by_city),
        "total_countries": len(by_country),
        "avg_rating": avg([float(r["Average_rating"]) for r in restaurants]),
        "avg_menu_price": avg([float(m["Price"]) for m in menus]),
        "delivery_ratio": round(
            sum(1 for r in restaurants if r["Delivery_available"] == "True")
            / len(restaurants)
            * 100,
            1,
        ),
    },
    "cities": city_rows,
    "cuisines": cuisine_rows,
    "food_categories": [
        {"category": c, "count": n} for c, n in category_counter.most_common()
    ],
    "opening_decades": [
        {"decade": f"{d}s", "count": opening_counter[d]}
        for d in sorted(opening_counter)
    ],
    "price_levels": price_level_rows,
    "rating_distribution": rating_distribution,
    "chain_vs_local": {
        "cities": [c["city"] for c in city_rows],
        "series": [
            {"name": kind, "data": data} for kind, data in sorted(chain_by_city.items())
        ],
        "totals": {kind: len(rows) for kind, rows in sorted(by_chain.items())},
    },
    "cuisine_price": cuisine_price_rows,
    "coord_check": coord_check,
    "top_rated": [
        {
            "name": r["Restaurant_name"],
            "city": r["City"],
            "cuisine": r["Cuisine"],
            "rating": float(r["Average_rating"]),
            "reviews": int(r["Review_count"]),
        }
        for r in top_rated
    ],
}

payload = json.dumps(result, ensure_ascii=False, indent=2)

os.makedirs(os.path.dirname(JS_OUTPUT), exist_ok=True)

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(payload)

with open(JS_OUTPUT, "w", encoding="utf-8") as f:
    f.write(f"// build_dashboard_data.py 가 생성한 파일 — 직접 수정하지 말 것\nconst DASHBOARD_DATA = {payload};\n")

print(f"{OUTPUT} / {JS_OUTPUT} 생성 완료")
print(f"레스토랑 {len(restaurants):,}개 / 메뉴 {len(menus):,}개 / 도시 {len(by_city)}개")
print(f"좌표 점검: 자기 도시 반경 2도 이내 {coord_check['near_own_city']}건 ({coord_check['ratio']}%)")
