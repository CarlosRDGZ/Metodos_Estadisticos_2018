library("agricolae", lib.loc = "C:/Users/Carlos/Documents/R/win-library/3.4/")

results <- c(
    45,43,41,42,
    44,44,45,43,
    40,44,45,46,
    44,45,46,45
)

operators <- rep( c("operator1", "operator2", "operator3", "operator4"), each = 4)

technics <- rep(c("technic1", "technic2", "technic3", "technic4"), times = 4)

data<- data.frame(results, operators, technics)

print(head(data))

print(tail(data))

model <- aov(results~ operators+ technics, data = data)
print(summary(model))

print(TukeyHSD(model))

par(mar=c(6,11,3,1))
plot(TukeyHSD(model,'operators'), las=1, col="brown")

library(agricolae)
test <- HSD.test(model, "operators", group=TRUE)
print(test$groups)

qqnorm(model$residuals) 
qqline(model$residuals)

shapiro.test(model$residuals)