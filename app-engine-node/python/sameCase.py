# test = "I am Nikhil"
test = input()
result = []
for c in test:
    print(ord(c))
    print(ord('a'))
    if c.isalnum():
        if ord(c) <= ord('Z'):
            # num = ord(c) - ord('a')
            # print(chr(ord(c) - num))       
            result.append(chr(ord(c) + 32))
        # print(ord(c) - ord('A'))
        else:
            result.append(chr(ord(c)))
    else:
        result.append(chr(ord(c)))
        
print(''.join(result))