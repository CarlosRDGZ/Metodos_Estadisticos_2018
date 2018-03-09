library("agricolae", lib.loc = "C:/Users/Carlos/Documents/R/win-library/3.4/")

results <- c(
    452,379,412,320,350,390,378,
    322,345,367,341,372,317,324,
    298,312,280,310,235,304,320,
    340,358,345,362,370,323,368
)

lines <- rep( c("line1", "line2", "line3", "line4"), each = 7)

days <- rep(c("day1", "day2", "day3", "day4", "day5", "day6", "day7"), times = 4)

data<- data.frame(results, lines, days)

print(head(data))

print(tail(data))

model <- aov(results~ lines+ days, data = data)
print(summary(model))

print(TukeyHSD(model))

par(mar=c(6,11,3,1))
plot(TukeyHSD(model,'lines'), las=1, col="brown")

test <- HSD.test(model, "lines", group=TRUE)
print(test$groups)

qqnorm(model$residuals) 
qqline(model$residuals)

shapiro.test(model$residuals)
