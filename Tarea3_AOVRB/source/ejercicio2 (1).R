Resp_Prod <- c(
    1.04,1.05,1.06,1.07,1.05,
    1.10,1.11,1.09,1.07,1.08,
    1.21,1.19,1.18,1.17,1.21
)

Trt_Marcas <- rep( c("Marca1", "Marca2", "Marca3"), each = 5)

Blq_Mediciones <- rep(c("Medicion1", "Medicion2", "Medicion3", "Medicion4", "Medicion5"), times = 3)

Datos<- data.frame(Resp_Prod, Trt_Marcas, Blq_Mediciones)

head(Datos)

tail(Datos)

modelo <- aov(Resp_Prod~ Trt_Marcas+ Blq_Mediciones, data = Datos)
summary(modelo)

TukeyHSD(modelo)

par(mar=c(6,11,3,1))
plot(TukeyHSD(modelo,'Trt_Marcas'), las=1, col="brown")

library(agricolae)
Prueba <- HSD.test(modelo, "Trt_Marcas", group=TRUE)
Prueba$groups

qqnorm(modelo$residuals) 
qqline(modelo$residuals)

shapiro.test(modelo$residuals)
