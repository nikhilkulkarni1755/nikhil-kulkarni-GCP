from datetime import date

numDaysInMonth = {}
numDaysInMonth[1] = 31
numDaysInMonth[3] = 31
numDaysInMonth[5] = 31
numDaysInMonth[7] = 31
numDaysInMonth[8] = 31
numDaysInMonth[10] = 31
numDaysInMonth[12] = 31
numDaysInMonth[4] = 30
numDaysInMonth[6] = 30
numDaysInMonth[9] = 30
numDaysInMonth[11] = 30
numDaysInMonth[2] = 28
# hashset[1, 3, 5, 7, 8, 10, 12] = [31]
# hashset[4, 6, 9, 11] = [30]
# hashset[2,] = [28]

# today = date.today()
today = date(2023, 12, 20)
year = today.year
month = today.month
day = today.day

# print(today)

daysPast = 0

for i in range(1, month):
    # find months before and then add that to the total daysPast
    # print(i)
    daysPast += numDaysInMonth[i]


daysPast += day

weeksLeft = int((365 - daysPast)/7)

if weeksLeft > 1:
    print("We have completed {} days in {}, {} weeks left!".format(daysPast, year, weeksLeft))
else:
    print("We have completed {} days in {}, {} week left!".format(daysPast, year, weeksLeft))
    
# find months before the current month
# Can we do this in O(n)?

# I think that there should be a way to make it O(n)

# I mean the max that this can go is 36 searches. Not that much. 

# But maybe for future upgrades, find a more efficient way to look up 

# or maybe just store 12 values as is in the hashset. 

# 1, 31

# 2, 28

# 3, ... so on and so forth

# does the tuple negate all of the hashset usecase. 




    

# here add the current num of days completed



# for k in hashset.keys():
#     if month in k:

# print("We have completed {} days in {}, {} weeks left!".format(daysPast, year, int((365 - daysPast)/7)))

