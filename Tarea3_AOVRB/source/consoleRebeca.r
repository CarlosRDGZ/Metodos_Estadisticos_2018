> Resp_Prod <- c(
+     452,379,412,320,350,390,378,
+     322,345,367,341,372,317,324,
+     298,312,280,310,235,304,320,
+     340,358,345,362,370,323,368
+ )
> Trt_Lineas <- rep( c("LineaProduc1", "LineaProduc2", "LineaProduc3", "LineaProduc4"), each = 7)
> Blq_Dias <- rep(c("Dias1", "Dias2", "Dias3", "Dias4", "Dias5", "Dias6", "Dias7"), times = 4)
> Datos<- data.frame(Resp_Prod, Trt_Lineas, Blq_Dias)
> head(Datos)
  Resp_Prod   Trt_Lineas Blq_Dias
1       452 LineaProduc1    Dias1
2       379 LineaProduc1    Dias2
3       412 LineaProduc1    Dias3
4       320 LineaProduc1    Dias4
5       350 LineaProduc1    Dias5
6       390 LineaProduc1    Dias6
> tail(Datos)
   Resp_Prod   Trt_Lineas Blq_Dias
23       358 LineaProduc4    Dias2
24       345 LineaProduc4    Dias3
25       362 LineaProduc4    Dias4
26       370 LineaProduc4    Dias5
27       323 LineaProduc4    Dias6
28       368 LineaProduc4    Dias7
> modelo <- aov(Resp_Prod~ Trt_Lineas+ Blq_Dias, data = Datos)
> summary(modelo)
            Df Sum Sq Mean Sq F value   Pr(>F)    
Trt_Lineas   3  28533    9511   9.342 0.000607 ***
Blq_Dias     6   2102     350   0.344 0.904163    
Residuals   18  18325    1018                     
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
> TukeyHSD(modelo)
  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = Resp_Prod ~ Trt_Lineas + Blq_Dias, data = Datos)

$Trt_Lineas
                               diff        lwr        upr     p adj
LineaProduc2-LineaProduc1 -41.85714  -90.05980   6.345514 0.1021941
LineaProduc3-LineaProduc1 -88.85714 -137.05980 -40.654486 0.0003158
LineaProduc4-LineaProduc1 -30.71429  -78.91694  17.488372 0.3050475
LineaProduc3-LineaProduc2 -47.00000  -95.20266   1.202657 0.0574718
LineaProduc4-LineaProduc2  11.14286  -37.05980  59.345514 0.9130011
LineaProduc4-LineaProduc3  58.14286    9.94020 106.345514 0.0150724

$Blq_Dias
              diff      lwr     upr     p adj
Dias2-Dias1  -4.50 -79.0532 70.0532 0.9999929
Dias3-Dias1  -2.00 -76.5532 72.5532 0.9999999
Dias4-Dias1 -19.75 -94.3032 54.8032 0.9718819
Dias5-Dias1 -21.25 -95.8032 53.3032 0.9601607
Dias6-Dias1 -19.50 -94.0532 55.0532 0.9735669
Dias7-Dias1  -5.50 -80.0532 69.0532 0.9999769
Dias3-Dias2   2.50 -72.0532 77.0532 0.9999998
Dias4-Dias2 -15.25 -89.8032 59.3032 0.9924218
Dias5-Dias2 -16.75 -91.3032 57.8032 0.9876492
Dias6-Dias2 -15.00 -89.5532 59.5532 0.9930556
Dias7-Dias2  -1.00 -75.5532 73.5532 1.0000000
Dias4-Dias3 -17.75 -92.3032 56.8032 0.9834101
Dias5-Dias3 -19.25 -93.8032 55.3032 0.9751790
Dias6-Dias3 -17.50 -92.0532 57.0532 0.9845573
Dias7-Dias3  -3.50 -78.0532 71.0532 0.9999984
Dias5-Dias4  -1.50 -76.0532 73.0532 1.0000000
Dias6-Dias4   0.25 -74.3032 74.8032 1.0000000
Dias7-Dias4  14.25 -60.3032 88.8032 0.9947162
Dias6-Dias5   1.75 -72.8032 76.3032 1.0000000
Dias7-Dias5  15.75 -58.8032 90.3032 0.9910230
Dias7-Dias6  14.00 -60.5532 88.5532 0.9951952

> par(mar=c(6,11,3,1))
> plot(TukeyHSD(modelo,'Trt_Lineas'), las=1, col="brown")
> library(agricolae)
> Prueba <- HSD.test(modelo, "Trt_Lineas", group=TRUE)
> Prueba$groups
             Resp_Prod groups
LineaProduc1  383.0000      a
LineaProduc4  352.2857      a
LineaProduc2  341.1429     ab
LineaProduc3  294.1429      b
> qqnorm(modelo$residuals)
> qqline(modelo$residuals)
> shapiro.test(modelo$residuals)

	Shapiro-Wilk normality test

data:  modelo$residuals
W = 0.97675, p-value = 0.7668
