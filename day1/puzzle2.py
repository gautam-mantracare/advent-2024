def solve_puzzle(left_list, right_list):
    counter = {x: 0 for x in left_list}
    for v in right_list:
        if v in counter:
            counter[v] += 1
    
    total = 0
    for k, v in counter.items():
        total += k * v
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