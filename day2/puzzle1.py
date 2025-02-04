import sys

def solve_puzzle(reports):
    safe = 0
    for report in reports:
        increasing = report[0] < report[1]
        is_safe_report = True
        for i in range(1, len(report)):
            diff = report[i] - report[i - 1]
            if (increasing and diff < 0) or (not increasing and diff > 0):
                is_safe_report = False
                break

            if abs(diff) < 1 or abs(diff) > 3:
                is_safe_report = False
                break

        if is_safe_report:
            safe += 1

    return safe

        

if __name__ == '__main__':
    input_file = open(sys.argv[1], 'r').readlines()

    reports = []
    for line in input_file:
        reports.append(list(map(int, line.split())))

    res = solve_puzzle(reports)
    print(res)