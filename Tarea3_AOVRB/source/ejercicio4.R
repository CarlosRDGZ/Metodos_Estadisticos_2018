library("agricolae", lib.loc = "C:/Users/Carlos/Documents/R/win-library/3.4/")

results <- c(
    13,22,18,
    16,24,17,
    5,4,1
)

solutions <- rep( c("solution1", "solution2", "solution3"), each = 3)

days <- rep(c("day1", "day2", "day3"), times = 3)

data<- data.frame(results, solutions, days)

print(head(data))

print(tail(data))

model <- aov(results~ solutions+ days, data = data)
print(summary(model))

print(TukeyHSD(model))

par(mar=c(6,11,3,1))
plot(TukeyHSD(model,'solutions'), las=1, col="brown")

library(agricolae)
test <- HSD.test(model, "solutions", group=TRUE)
print(test$groups)

qqnorm(model$residuals) 
qqline(model$residuals)

shapiro.test(model$residuals)
