import sys
import re

def solve_puzzle(instructions):
    result = 0
    cleanup_pattern = r"(?<=don't\(\))[\S\s]*?(?=do\(\))|(?<=don't\(\))[\S\s]*?"
    
    instructions = re.sub(cleanup_pattern, '', instructions)

    pattern = r"mul\((\d{1,3}),(\d{1,3})\)"
    
    valid_instructions = re.findall(pattern, instructions, re.MULTILINE)
    for ins in valid_instructions:
        result += int(ins[0]) * int(ins[1])
    return result

if __name__ == '__main__':
    instructions = open(sys.argv[1], 'r').read()

    res = solve_puzzle(instructions)
    print(res)