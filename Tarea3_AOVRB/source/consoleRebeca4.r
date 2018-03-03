> Resp_Prod <- c(
+     13,22,18,
+     16,24,17,
+     5,4,1
+ )
> Trt_Soluciones <- rep( c("Solucion1", "Solucion2", "Solucion3"), each = 3)
> Blq_Dias <- rep(c("Dia1", "Dia2", "Dia3"), times = 3)
> Datos<- data.frame(Resp_Prod, Trt_Soluciones, Blq_Dias)
> head(Datos)
  Resp_Prod Trt_Soluciones Blq_Dias
1        13      Solucion1     Dia1
2        22      Solucion1     Dia2
3        18      Solucion1     Dia3
4        16      Solucion2     Dia1
5        24      Solucion2     Dia2
6        17      Solucion2     Dia3
> tail(Datos)
  Resp_Prod Trt_Soluciones Blq_Dias
4        16      Solucion2     Dia1
5        24      Solucion2     Dia2
6        17      Solucion2     Dia3
7         5      Solucion3     Dia1
8         4      Solucion3     Dia2
9         1      Solucion3     Dia3
> modelo <- aov(Resp_Prod~ Trt_Soluciones+ Blq_Dias, data = Datos)
> summary(modelo)
               Df Sum Sq Mean Sq F value  Pr(>F)   
Trt_Soluciones  2  452.7  226.33  24.691 0.00561 **
Blq_Dias        2   50.7   25.33   2.764 0.17627   
Residuals       4   36.7    9.17                   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
> TukeyHSD(modelo)
  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = Resp_Prod ~ Trt_Soluciones + Blq_Dias, data = Datos)

$Trt_Soluciones
                          diff        lwr       upr     p adj
Solucion2-Solucion1   1.333333  -7.477083 10.143749 0.8571399
Solucion3-Solucion1 -14.333333 -23.143749 -5.522917 0.0096532
Solucion3-Solucion2 -15.666667 -24.477083 -6.856251 0.0069870

$Blq_Dias
                diff        lwr       upr     p adj
Dia2-Dia1  5.3333333  -3.477083 14.143749 0.1931817
Dia3-Dia1  0.6666667  -8.143749  9.477083 0.9610862
Dia3-Dia2 -4.6666667 -13.477083  4.143749 0.2558503

> par(mar=c(6,11,3,1))
> plot(TukeyHSD(modelo,'Trt_Soluciones'), las=1, col="brown")
> library(agricolae)
> Prueba <- HSD.test(modelo, "Trt_Soluciones", group=TRUE)
> Prueba$groups
          Resp_Prod groups
Solucion2 19.000000      a
Solucion1 17.666667      a
Solucion3  3.333333      b
> qqnorm(modelo$residuals)
> qqline(modelo$residuals)
> shapiro.test(modelo$residuals)

	Shapiro-Wilk normality test

data:  modelo$residuals
W = 0.93401, p-value = 0.5204

> 