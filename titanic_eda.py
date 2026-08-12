import pandas as pd

pd.set_option('display.width', 120)
pd.set_option('display.max_columns', 20)

df = pd.read_excel('titanic.xls')

print("=" * 60)
print("1. 데이터 크기 및 컬럼")
print("=" * 60)
print(f"행 수: {df.shape[0]}, 열 수: {df.shape[1]}")
print(df.dtypes)

print("\n" + "=" * 60)
print("2. 결측치 현황")
print("=" * 60)
missing = df.isnull().sum()
missing_pct = (missing / len(df) * 100).round(1)
print(pd.DataFrame({'결측치수': missing, '결측치비율(%)': missing_pct}).query('결측치수 > 0').sort_values('결측치수', ascending=False))

print("\n" + "=" * 60)
print("3. 기술 통계 (수치형)")
print("=" * 60)
print(df.describe())

print("\n" + "=" * 60)
print("4. 전체 생존율")
print("=" * 60)
survival_rate = df['survived'].mean() * 100
print(f"전체 생존율: {survival_rate:.1f}% ({df['survived'].sum()}명 생존 / {len(df)}명 중)")

print("\n" + "=" * 60)
print("5. 성별 생존율")
print("=" * 60)
print(df.groupby('sex')['survived'].agg(['count', 'sum', 'mean']).rename(
    columns={'count': '인원수', 'sum': '생존자수', 'mean': '생존율'}))

print("\n" + "=" * 60)
print("6. 객실 등급(pclass)별 생존율")
print("=" * 60)
print(df.groupby('pclass')['survived'].agg(['count', 'sum', 'mean']).rename(
    columns={'count': '인원수', 'sum': '생존자수', 'mean': '생존율'}))

print("\n" + "=" * 60)
print("7. 성별 x 객실등급 생존율")
print("=" * 60)
print(df.groupby(['pclass', 'sex'])['survived'].mean().unstack())

print("\n" + "=" * 60)
print("8. 탑승 항구(embarked)별 생존율")
print("=" * 60)
print(df.groupby('embarked')['survived'].agg(['count', 'sum', 'mean']).rename(
    columns={'count': '인원수', 'sum': '생존자수', 'mean': '생존율'}))

print("\n" + "=" * 60)
print("9. 나이 구간별 생존율")
print("=" * 60)
df['age_group'] = pd.cut(df['age'], bins=[0, 12, 18, 30, 50, 100],
                          labels=['어린이(0-12)', '청소년(13-18)', '청년(19-30)', '중년(31-50)', '장년(51+)'])
print(df.groupby('age_group', observed=True)['survived'].agg(['count', 'sum', 'mean']).rename(
    columns={'count': '인원수', 'sum': '생존자수', 'mean': '생존율'}))

print("\n" + "=" * 60)
print("10. 요금(fare) 통계 및 생존 여부별 비교")
print("=" * 60)
print(df.groupby('survived')['fare'].describe())
