import csv

FILE_PATH = "data/seoul_apt_2026H1.csv"
TARGET_GU = "중랑구"


def load_rows(path):
    with open(path, encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        return [row for row in reader if row["자치구명"] == TARGET_GU]


def to_int(value):
    return int(value.replace(",", "").strip())


def main():
    rows = load_rows(FILE_PATH)

    count = len(rows)
    if count == 0:
        print(f"{TARGET_GU} 거래 내역이 없습니다.")
        return

    prices = [to_int(row["물건금액(만원)"]) for row in rows]
    avg_price_manwon = sum(prices) / count
    avg_price_eok = round(avg_price_manwon / 10000, 2)

    print(f"[{TARGET_GU}] 거래 건수: {count}건")
    print(f"[{TARGET_GU}] 평균 물건금액: {avg_price_eok}억 원")

    oldest = sorted(rows, key=lambda row: int(row["건축년도"]))[:3]
    print(f"\n[{TARGET_GU}] 건축년도가 오래된 아파트 TOP 3")
    for i, row in enumerate(oldest, 1):
        print(
            f"{i}. {row['건물명']} ({row['법정동명']}) - "
            f"건축년도: {row['건축년도']}, 계약일: {row['계약일']}"
        )


if __name__ == "__main__":
    main()
