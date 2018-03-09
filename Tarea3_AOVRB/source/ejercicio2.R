library("agricolae", lib.loc = "C:/Users/Carlos/Documents/R/win-library/3.4/")

results <- c(
    1.04,1.05,1.06,1.07,1.05,
    1.10,1.11,1.09,1.07,1.08,
    1.21,1.19,1.18,1.17,1.21
)

brands <- rep( c("brand1", "brand2", "brand3"), each = 5)

measurs <- rep(c("measur1", "measur2", "measur3", "measur4", "measur5"), times = 3)

data<- data.frame(results, brands, measurs)

print(head(data))

print(tail(data))

model <- aov(results~ brands+ measurs, data = data)
summary(model)

TukeyHSD(model)

par(mar=c(6,11,3,1))
plot(TukeyHSD(model,'brands'), las=1, col="brown")

library(agricolae)
test <- HSD.test(model, "brands", group=TRUE)
print(test$groups)

qqnorm(model$residuals) 
qqline(model$residuals)

shapiro.test(model$residuals)
