num1 = float(input("첫 번째 숫자: "))
op = input("연산자 (+, -, *, /): ")
num2 = float(input("두 번째 숫자: "))

if op == "+":
    result = num1 + num2
elif op == "-":
    result = num1 - num2
elif op == "*":
    result = num1 * num2
elif op == "/":
    result = num1 / num2
else:
    result = "알 수 없는 연산자"

print("결과:", result)
