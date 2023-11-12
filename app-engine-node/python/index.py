from datetime import date

hashset = {}
hashset[31] = [1, 3, 5, 7, 8, 10, 12]
hashset[30] = [4, 6, 9, 11]
hashset[28] = [2]

today = date.today()
# today = date(2024, 12, 25)
year = today.year
month = today.month
day = today.day

# counter = 0
daysPast = 0

for k, v in hashset.items():
    # print(k, v)
    for i in v:
        if i == 2 and year % 4 == 0:
            daysPast += (k + 1)
            continue
        if i < month:
            daysPast += k

for days in range(0, day):
    daysPast += 1

print("We have {} days left in the year, {} weeks left!".format(daysPast, int((365 - daysPast)/7)))

