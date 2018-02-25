linea1 <- c(452,379,412,320,350,390,378)
linea2 <- c(322,345,367,341,372,317,324)
linea3 <- c(298,312,280,310,235,304,320)
linea4 <- c(340,358,345,362,370,323,368)

lineas <- data.frame(linea1,linea2,linea3,linea4)

apply(lineas, 2, sum)
apply(lineas, 2, mean)

nLineas <- as.factor(rep(c(1, 2, 3, 4), each = 7))
lineas <- data.frame(nLineas, linea=c(linea1,linea2,linea3,linea4))

modelo <- aov(linea ~ nLineas, data=lineas)

summary(modelo)

TukeyHSD(modelo)

plot(TukeyHSD(modelo), las=1, col="brown")

library(agricolae)
Prueba.HSD <- HSD.test(modelo, "nLineas", group=TRUE)
Prueba.HSD$groups

qqnorm(modelo$residuals) 
qqline(modelo$residuals)
shapiro.test(modelo$residuals)
