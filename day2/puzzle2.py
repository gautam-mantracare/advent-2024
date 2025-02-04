import sys

def is_safe(report):
    increasing = report[0] < report[1]
    for i in range(1, len(report)):
        diff = report[i] - report[i - 1]
        if (increasing and diff < 0) or (not increasing and diff > 0):
            return False

        if abs(diff) < 1 or abs(diff) > 3:
            return False
    return True

def is_safe_report(report, unsafe_count = 0):
    if unsafe_count > 1:
        return False
    
    if is_safe(report):
        return True

    for i in range(len(report)):
        if is_safe_report(report[:i] + report[i + 1:], unsafe_count + 1):
            return True

    return False

def solve_puzzle(reports):
    safe = 0
    
    for report in reports:
        if is_safe_report(report):
            safe += 1

    return safe

        

if __name__ == '__main__':
    input_file = open(sys.argv[1], 'r').readlines()

    reports = []
    for line in input_file:
        reports.append(list(map(int, line.split())))

    res = solve_puzzle(reports)
    print(res)