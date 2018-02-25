marca1 <- c(1.04,1.05,1.06,1.07,1.05)
marca2 <- c(1.10,1.11,1.09,1.07,1.08)
marca3 <- c(1.21,1.19,1.18,1.17,1.21)

marcas <- data.frame(marca1,marca2,marca3)

apply(marcas, 2, sum)
apply(marcas, 2, mean)

nMarcas <- as.factor(rep(c(1, 2, 3), each = 5))
marcas <- data.frame(nMarcas, marca=c(marca1,marca2,marca3))

modelo <- aov(marca ~ nMarcas, data=marcas)

summary(modelo)

TukeyHSD(modelo)

plot(TukeyHSD(modelo), las=1, col="brown")

library(agricolae)
Prueba.HSD <- HSD.test(modelo, "nMarcas", group=TRUE)
Prueba.HSD$groups

qqnorm(modelo$residuals) 
qqline(modelo$residuals)
shapiro.test(modelo$residuals)