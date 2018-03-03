> Resp_Prod <- c(
+     1.04,1.05,1.06,1.07,1.05,
+     1.10,1.11,1.09,1.07,1.08,
+     1.21,1.19,1.18,1.17,1.21
+ )
> Trt_Marcas <- rep( c("Marca1", "Marca2", "Marca3"), each = 5)
> Blq_Mediciones <- rep(c("Medicion1", "Medicion2", "Medicion3", "Medicion4", "Medicion5"), times = 3)
> Datos<- data.frame(Resp_Prod, Trt_Marcas, Blq_Mediciones)
> head(Datos)
  Resp_Prod Trt_Marcas Blq_Mediciones
1      1.04     Marca1      Medicion1
2      1.05     Marca1      Medicion2
3      1.06     Marca1      Medicion3
4      1.07     Marca1      Medicion4
5      1.05     Marca1      Medicion5
6      1.10     Marca2      Medicion1
> tail(Datos)
   Resp_Prod Trt_Marcas Blq_Mediciones
10      1.08     Marca2      Medicion5
11      1.21     Marca3      Medicion1
12      1.19     Marca3      Medicion2
13      1.18     Marca3      Medicion3
14      1.17     Marca3      Medicion4
15      1.21     Marca3      Medicion5
> modelo <- aov(Resp_Prod~ Trt_Marcas+ Blq_Mediciones, data = Datos)
> summary(modelo)
               Df  Sum Sq  Mean Sq F value   Pr(>F)    
Trt_Marcas      2 0.05124 0.025620  84.462 4.18e-06 ***
Blq_Mediciones  4 0.00037 0.000093   0.308    0.865    
Residuals       8 0.00243 0.000303                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
> TukeyHSD(modelo)
  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = Resp_Prod ~ Trt_Marcas + Blq_Mediciones, data = Datos)

$Trt_Marcas
               diff         lwr        upr     p adj
Marca2-Marca1 0.036 0.004524848 0.06747515 0.0274539
Marca3-Marca1 0.138 0.106524848 0.16947515 0.0000041
Marca3-Marca2 0.102 0.070524848 0.13347515 0.0000393

$Blq_Mediciones
                             diff         lwr        upr     p adj
Medicion2-Medicion1  6.661338e-16 -0.04912822 0.04912822 1.0000000
Medicion3-Medicion1 -6.666667e-03 -0.05579489 0.04246156 0.9882240
Medicion4-Medicion1 -1.333333e-02 -0.06246156 0.03579489 0.8746058
Medicion5-Medicion1 -3.333333e-03 -0.05246156 0.04579489 0.9991771
Medicion3-Medicion2 -6.666667e-03 -0.05579489 0.04246156 0.9882240
Medicion4-Medicion2 -1.333333e-02 -0.06246156 0.03579489 0.8746058
Medicion5-Medicion2 -3.333333e-03 -0.05246156 0.04579489 0.9991771
Medicion4-Medicion3 -6.666667e-03 -0.05579489 0.04246156 0.9882240
Medicion5-Medicion3  3.333333e-03 -0.04579489 0.05246156 0.9991771
Medicion5-Medicion4  1.000000e-02 -0.03912822 0.05912822 0.9500473

> par(mar=c(6,11,3,1))
> plot(TukeyHSD(modelo,'Trt_Marcas'), las=1, col="brown")
> library(agricolae)
> Prueba <- HSD.test(modelo, "Trt_Marcas", group=TRUE)
> Prueba$groups
       Resp_Prod groups
Marca3     1.192      a
Marca2     1.090      b
Marca1     1.054      c
> qqnorm(modelo$residuals)
> qqline(modelo$residuals)
> shapiro.test(modelo$residuals)

	Shapiro-Wilk normality test

data:  modelo$residuals
W = 0.93236, p-value = 0.2959

> 