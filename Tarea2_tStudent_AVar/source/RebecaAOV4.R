line1 <- c(452,379,412,320,350,390,378)
line2 <- c(322,345,367,341,372,317,324)
line3 <- c(298,312,280,310,235,304,320)
line4 <- c(340,358,345,362,370,323,368)

lines <- data.frame(line1,line2,linea3,line4)

apply(lines, 2, sum)
apply(lines, 2, mean)

nLines <- as.factor(rep(c(1, 2, 3, 4), each = 7))
lines <- data.frame(nLines, linea=c(line1,line2,linea3,line4))

modelo <- aov(linea ~ nLines, data=lines)

summary(modelo)

TukeyHSD(modelo)

plot(TukeyHSD(modelo), las=1, col="brown")

library(agricolae)
Prueba.HSD <- HSD.test(modelo, "nLines", group=TRUE)
Prueba.HSD$groups

qqnorm(modelo$residuals) 
qqline(modelo$residuals)
shapiro.test(modelo$residuals)

> apply(lines, 2, sum)
 line1  line2 linea3  line4 
  2681   2388   2059   2466 
> apply(lines, 2, mean)
   line1    line2   linea3    line4 
383.0000 341.1429 294.1429 352.2857 