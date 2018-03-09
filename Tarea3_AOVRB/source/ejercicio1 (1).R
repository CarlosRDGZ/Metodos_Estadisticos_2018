Resp_Prod <- c(
    452,379,412,320,350,390,378,
    322,345,367,341,372,317,324,
    298,312,280,310,235,304,320,
    340,358,345,362,370,323,368
)

Trt_Lineas <- rep( c("LineaProduc1", "LineaProduc2", "LineaProduc3", "LineaProduc4"), each = 7)

Blq_Dias <- rep(c("Dias1", "Dias2", "Dias3", "Dias4", "Dias5", "Dias6", "Dias7"), times = 4)

Datos<- data.frame(Resp_Prod, Trt_Lineas, Blq_Dias)

head(Datos)

tail(Datos)

modelo <- aov(Resp_Prod~ Trt_Lineas+ Blq_Dias, data = Datos)
summary(modelo)

TukeyHSD(modelo)

par(mar=c(6,11,3,1))
plot(TukeyHSD(modelo,'Trt_Lineas'), las=1, col="brown")

library(agricolae)
Prueba <- HSD.test(modelo, "Trt_Lineas", group=TRUE)
Prueba$groups

qqnorm(modelo$residuals) 
qqline(modelo$residuals)

shapiro.test(modelo$residuals)
