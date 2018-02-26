solucion1 <- c(13,22,18)
solucion2 <- c(16,24,17)
solucion3 <- c(5,4,1)

soluciones <- data.frame(solucion1,solucion2,solucion3)

apply(soluciones, 2, sum)
apply(soluciones, 2, mean)

nSoluciones <- as.factor(rep(c(1, 2, 3), each = 3))
soluciones <- data.frame(nSoluciones, solucion=c(solucion1,solucion2,solucion3))

modelo <- aov(solucion ~ nSoluciones, data=soluciones)

summary(modelo)

TukeyHSD(modelo)

plot(TukeyHSD(modelo), las=1, col="brown")

library(agricolae)
Prueba.HSD <- HSD.test(modelo, "nSoluciones", group=TRUE)
Prueba.HSD$groups

qqnorm(modelo$residuals) 
qqline(modelo$residuals)
shapiro.test(modelo$residuals)
