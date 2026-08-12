// build_dashboard_data.py 가 생성한 파일 — 직접 수정하지 말 것
const DASHBOARD_DATA = {
  "summary": {
    "total_restaurants": 5000,
    "total_menu_items": 62417,
    "total_cities": 10,
    "total_countries": 5,
    "avg_rating": 3.5,
    "avg_menu_price": 56.11,
    "delivery_ratio": 63.7
  },
  "cities": [
    {
      "city": "Osaka",
      "country": "Japan",
      "count": 525,
      "avg_rating": 3.47,
      "avg_menu_price": 55.79,
      "lat": 34.6937,
      "lon": 135.5023
    },
    {
      "city": "London",
      "country": "United Kingdom",
      "count": 520,
      "avg_rating": 3.54,
      "avg_menu_price": 55.61,
      "lat": 51.5074,
      "lon": -0.1278
    },
    {
      "city": "Delhi",
      "country": "India",
      "count": 509,
      "avg_rating": 3.47,
      "avg_menu_price": 57.49,
      "lat": 28.6139,
      "lon": 77.209
    },
    {
      "city": "Tokyo",
      "country": "Japan",
      "count": 502,
      "avg_rating": 3.52,
      "avg_menu_price": 56.05,
      "lat": 35.6762,
      "lon": 139.6503
    },
    {
      "city": "Manchester",
      "country": "United Kingdom",
      "count": 499,
      "avg_rating": 3.5,
      "avg_menu_price": 54.93,
      "lat": 53.4808,
      "lon": -2.2426
    },
    {
      "city": "Rio de Janeiro",
      "country": "Brazil",
      "count": 498,
      "avg_rating": 3.51,
      "avg_menu_price": 54.24,
      "lat": -22.9068,
      "lon": -43.1729
    },
    {
      "city": "Sao Paulo",
      "country": "Brazil",
      "count": 493,
      "avg_rating": 3.42,
      "avg_menu_price": 55.4,
      "lat": -23.5505,
      "lon": -46.6333
    },
    {
      "city": "Los Angeles",
      "country": "USA",
      "count": 492,
      "avg_rating": 3.57,
      "avg_menu_price": 56.51,
      "lat": 34.0522,
      "lon": -118.2437
    },
    {
      "city": "New York",
      "country": "USA",
      "count": 488,
      "avg_rating": 3.51,
      "avg_menu_price": 57.79,
      "lat": 40.7128,
      "lon": -74.006
    },
    {
      "city": "Mumbai",
      "country": "India",
      "count": 474,
      "avg_rating": 3.54,
      "avg_menu_price": 57.39,
      "lat": 19.076,
      "lon": 72.8777
    }
  ],
  "cuisines": [
    {
      "cuisine": "Mexican",
      "count": 437,
      "avg_rating": 3.49
    },
    {
      "cuisine": "American",
      "count": 432,
      "avg_rating": 3.54
    },
    {
      "cuisine": "Mediterranean",
      "count": 430,
      "avg_rating": 3.41
    },
    {
      "cuisine": "Indian",
      "count": 427,
      "avg_rating": 3.57
    },
    {
      "cuisine": "Thai",
      "count": 422,
      "avg_rating": 3.54
    },
    {
      "cuisine": "Pizza",
      "count": 419,
      "avg_rating": 3.54
    },
    {
      "cuisine": "French",
      "count": 417,
      "avg_rating": 3.51
    },
    {
      "cuisine": "Japanese",
      "count": 415,
      "avg_rating": 3.43
    },
    {
      "cuisine": "Burger",
      "count": 405,
      "avg_rating": 3.52
    },
    {
      "cuisine": "Chinese",
      "count": 401,
      "avg_rating": 3.47
    },
    {
      "cuisine": "Italian",
      "count": 398,
      "avg_rating": 3.49
    },
    {
      "cuisine": "Brazilian",
      "count": 397,
      "avg_rating": 3.54
    }
  ],
  "food_categories": [
    {
      "category": "Dessert",
      "count": 15721
    },
    {
      "category": "Beverage",
      "count": 15627
    },
    {
      "category": "Starter",
      "count": 15568
    },
    {
      "category": "Main",
      "count": 15501
    }
  ],
  "opening_decades": [
    {
      "decade": "1950s",
      "count": 688
    },
    {
      "decade": "1960s",
      "count": 710
    },
    {
      "decade": "1970s",
      "count": 679
    },
    {
      "decade": "1980s",
      "count": 664
    },
    {
      "decade": "1990s",
      "count": 661
    },
    {
      "decade": "2000s",
      "count": 651
    },
    {
      "decade": "2010s",
      "count": 675
    },
    {
      "decade": "2020s",
      "count": 272
    }
  ],
  "price_levels": [
    {
      "level": "$",
      "count": 1277,
      "avg_rating": 3.56,
      "avg_menu_price": 22.53
    },
    {
      "level": "$$",
      "count": 1241,
      "avg_rating": 3.52,
      "avg_menu_price": 44.96
    },
    {
      "level": "$$$",
      "count": 1231,
      "avg_rating": 3.48,
      "avg_menu_price": 67.59
    },
    {
      "level": "$$$$",
      "count": 1251,
      "avg_rating": 3.46,
      "avg_menu_price": 89.86
    }
  ],
  "rating_distribution": [
    {
      "bucket": "2.0–2.5",
      "count": 755
    },
    {
      "bucket": "2.5–3.0",
      "count": 827
    },
    {
      "bucket": "3.0–3.5",
      "count": 826
    },
    {
      "bucket": "3.5–4.0",
      "count": 828
    },
    {
      "bucket": "4.0–4.5",
      "count": 795
    },
    {
      "bucket": "4.5–5.0",
      "count": 969
    }
  ],
  "chain_vs_local": {
    "cities": [
      "Osaka",
      "London",
      "Delhi",
      "Tokyo",
      "Manchester",
      "Rio de Janeiro",
      "Sao Paulo",
      "Los Angeles",
      "New York",
      "Mumbai"
    ],
    "series": [
      {
        "name": "Chain",
        "data": [
          178,
          144,
          134,
          156,
          133,
          160,
          131,
          160,
          139,
          150
        ]
      },
      {
        "name": "Local",
        "data": [
          347,
          376,
          375,
          346,
          366,
          338,
          362,
          332,
          349,
          324
        ]
      }
    ],
    "totals": {
      "Chain": 1485,
      "Local": 3515
    }
  },
  "cuisine_price": [
    {
      "cuisine": "Mexican",
      "avg_price": 57.86
    },
    {
      "cuisine": "Italian",
      "avg_price": 57.49
    },
    {
      "cuisine": "Indian",
      "avg_price": 57.44
    },
    {
      "cuisine": "Pizza",
      "avg_price": 56.62
    },
    {
      "cuisine": "Burger",
      "avg_price": 56.55
    },
    {
      "cuisine": "American",
      "avg_price": 56.09
    },
    {
      "cuisine": "Chinese",
      "avg_price": 55.79
    },
    {
      "cuisine": "Japanese",
      "avg_price": 55.67
    },
    {
      "cuisine": "French",
      "avg_price": 55.19
    },
    {
      "cuisine": "Mediterranean",
      "avg_price": 55.14
    },
    {
      "cuisine": "Brazilian",
      "avg_price": 54.91
    },
    {
      "cuisine": "Thai",
      "avg_price": 54.54
    }
  ],
  "coord_check": {
    "checked": 5000,
    "near_own_city": 0,
    "ratio": 0.0
  },
  "top_rated": [
    {
      "name": "Rio de Janeiro Chinese Place 4803",
      "city": "Rio de Janeiro",
      "cuisine": "Chinese",
      "rating": 5.0,
      "reviews": 4998
    },
    {
      "name": "Los Angeles Pizza Place 177",
      "city": "Los Angeles",
      "cuisine": "Pizza",
      "rating": 5.0,
      "reviews": 4991
    },
    {
      "name": "Thai Chain 4622",
      "city": "Mumbai",
      "cuisine": "Thai",
      "rating": 5.0,
      "reviews": 4979
    },
    {
      "name": "New York Chinese Place 3156",
      "city": "New York",
      "cuisine": "Chinese",
      "rating": 5.0,
      "reviews": 4960
    },
    {
      "name": "Brazilian Chain 869",
      "city": "Los Angeles",
      "cuisine": "Brazilian",
      "rating": 5.0,
      "reviews": 4920
    },
    {
      "name": "Manchester American Place 1235",
      "city": "Manchester",
      "cuisine": "American",
      "rating": 5.0,
      "reviews": 4863
    },
    {
      "name": "Indian Chain 2783",
      "city": "Delhi",
      "cuisine": "Indian",
      "rating": 5.0,
      "reviews": 4758
    },
    {
      "name": "London Mexican Place 2288",
      "city": "London",
      "cuisine": "Mexican",
      "rating": 5.0,
      "reviews": 4740
    },
    {
      "name": "Manchester Burger Place 880",
      "city": "Manchester",
      "cuisine": "Burger",
      "rating": 5.0,
      "reviews": 4710
    },
    {
      "name": "Manchester Mexican Place 2586",
      "city": "Manchester",
      "cuisine": "Mexican",
      "rating": 5.0,
      "reviews": 4691
    }
  ]
};
