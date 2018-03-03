Resp_Prod <- c(
    13,22,18,
    16,24,17,
    5,4,1
)

Trt_Soluciones <- rep( c("Solucion1", "Solucion2", "Solucion3"), each = 3)

Blq_Dias <- rep(c("Dia1", "Dia2", "Dia3"), times = 3)

Datos<- data.frame(Resp_Prod, Trt_Soluciones, Blq_Dias)

head(Datos)

tail(Datos)

modelo <- aov(Resp_Prod~ Trt_Soluciones+ Blq_Dias, data = Datos)
summary(modelo)

TukeyHSD(modelo)

par(mar=c(6,11,3,1))
plot(TukeyHSD(modelo,'Trt_Soluciones'), las=1, col="brown")

library(agricolae)
Prueba <- HSD.test(modelo, "Trt_Soluciones", group=TRUE)
Prueba$groups

qqnorm(modelo$residuals) 
qqline(modelo$residuals)

shapiro.test(modelo$residuals)
