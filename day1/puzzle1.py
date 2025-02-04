def solve_puzzle(left_list, right_list):
    left_list.sort()
    right_list.sort()

    total = 0
    for i in range(len(left_list)):
        total += abs(left_list[i] - right_list[i])
    return total

if __name__ == '__main__':
    puzzle_input = open('day1-in.txt', 'r').readlines()
    left_list = []
    right_list = []

    for line in puzzle_input:
        l, r = map(int, line.split())
        left_list.append(l)
        right_list.append(r)
    res = solve_puzzle(left_list, right_list)
    print(res)