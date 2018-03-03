> Resp_Prod <- c(
+     45,43,41,42,
+     44,44,45,43,
+     40,44,45,46,
+     44,45,46,45
+ )
> Trt_Operadores <- rep( c("Operador1", "Operador2", "Operador3", "Operador4"), each = 4)
> Blq_Tecnica <- rep(c("Tecnica1", "Tecnica2", "Tecnica3", "Tecnica4"), times = 4)
> Datos<- data.frame(Resp_Prod, Trt_Operadores, Blq_Tecnica)
> head(Datos)
  Resp_Prod Trt_Operadores Blq_Tecnica
1        45      Operador1    Tecnica1
2        43      Operador1    Tecnica2
3        41      Operador1    Tecnica3
4        42      Operador1    Tecnica4
5        44      Operador2    Tecnica1
6        44      Operador2    Tecnica2
> tail(Datos)
   Resp_Prod Trt_Operadores Blq_Tecnica
11        45      Operador3    Tecnica3
12        46      Operador3    Tecnica4
13        44      Operador4    Tecnica1
14        45      Operador4    Tecnica2
15        46      Operador4    Tecnica3
16        45      Operador4    Tecnica4
> modelo <- aov(Resp_Prod~ Trt_Operadores+ Blq_Tecnica, data = Datos)
> summary(modelo)
               Df Sum Sq Mean Sq F value Pr(>F)
Trt_Operadores  3  10.25   3.417   0.984  0.443
Blq_Tecnica     3   2.25   0.750   0.216  0.883
Residuals       9  31.25   3.472               
> TukeyHSD(modelo)
  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = Resp_Prod ~ Trt_Operadores + Blq_Tecnica, data = Datos)

$Trt_Operadores
                     diff       lwr      upr     p adj
Operador2-Operador1  1.25 -2.863331 5.363331 0.7804545
Operador3-Operador1  1.00 -3.113331 5.113331 0.8706964
Operador4-Operador1  2.25 -1.863331 6.363331 0.3738117
Operador3-Operador2 -0.25 -4.363331 3.863331 0.9973957
Operador4-Operador2  1.00 -3.113331 5.113331 0.8706964
Operador4-Operador3  1.25 -2.863331 5.363331 0.7804545

$Blq_Tecnica
                   diff       lwr      upr     p adj
Tecnica2-Tecnica1  0.75 -3.363331 4.863331 0.9387968
Tecnica3-Tecnica1  1.00 -3.113331 5.113331 0.8706964
Tecnica4-Tecnica1  0.75 -3.363331 4.863331 0.9387968
Tecnica3-Tecnica2  0.25 -3.863331 4.363331 0.9973957
Tecnica4-Tecnica2  0.00 -4.113331 4.113331 1.0000000
Tecnica4-Tecnica3 -0.25 -4.363331 3.863331 0.9973957

> par(mar=c(6,11,3,1))
> plot(TukeyHSD(modelo,'Trt_Operadores'), las=1, col="brown")
> library(agricolae)
> Prueba <- HSD.test(modelo, "Trt_Operadores", group=TRUE)
> Prueba$groups
          Resp_Prod groups
Operador4     45.00      a
Operador2     44.00      a
Operador3     43.75      a
Operador1     42.75      a
> qqnorm(modelo$residuals)
> qqline(modelo$residuals)
> shapiro.test(modelo$residuals)

	Shapiro-Wilk normality test

data:  modelo$residuals
W = 0.9566, p-value = 0.6008

> 