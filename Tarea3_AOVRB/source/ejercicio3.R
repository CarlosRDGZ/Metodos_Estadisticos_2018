Resp_Prod <- c(
    45,43,41,42,
    44,44,45,43,
    40,44,45,46,
    44,45,46,45
)

Trt_Operadores <- rep( c("Operador1", "Operador2", "Operador3", "Operador4"), each = 4)

Blq_Tecnica <- rep(c("Tecnica1", "Tecnica2", "Tecnica3", "Tecnica4"), times = 4)

Datos<- data.frame(Resp_Prod, Trt_Operadores, Blq_Tecnica)

head(Datos)

tail(Datos)

modelo <- aov(Resp_Prod~ Trt_Operadores+ Blq_Tecnica, data = Datos)
summary(modelo)

TukeyHSD(modelo)

par(mar=c(6,11,3,1))
plot(TukeyHSD(modelo,'Trt_Operadores'), las=1, col="brown")

library(agricolae)
Prueba <- HSD.test(modelo, "Trt_Operadores", group=TRUE)
Prueba$groups

qqnorm(modelo$residuals) 
qqline(modelo$residuals)

shapiro.test(modelo$residuals)