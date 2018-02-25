operadorA <- c(45,43,41,42)
operadorB <- c(44,44,45,43)
operadorC <- c(40,44,45,46)
operadorD <- c(44,45,46,45)

operadores <- data.frame(operadorA,operadorB,operadorC,operadorD)

apply(operadores, 2, sum)
apply(operadores, 2, mean)

nOperadores <- as.factor(rep(c(1, 2, 3, 4), each = 4))
operadores <- data.frame(nOperadores, operador=c(operadorA,operadorB,operadorC,operadorD))

modelo <- aov(operador ~ nOperadores, data=operadores)

summary(modelo)

TukeyHSD(modelo)

plot(TukeyHSD(modelo), las=1, col="brown")

library(agricolae)
Prueba.HSD <- HSD.test(modelo, "nOperadores", group=TRUE)
Prueba.HSD$groups

qqnorm(modelo$residuals) 
qqline(modelo$residuals)
shapiro.test(modelo$residuals)
