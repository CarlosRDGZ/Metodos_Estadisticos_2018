# Ejerccio 1
# tratamiento1 <- c(22, 28, 26, 18, 20, 19, 15, 20, 23, 21, 19, 20, 19, 18, 21)
# tratamiento2 <- c(26, 30, 24, 22, 21, 21, 18, 19, 21, 19, 18, 19, 17, 18, 22)

# Ejerccio 2
# tratamiento1 <- c(4, 4.5, 5, 3, 4.5, 5, 6, 4, 5, 6)
# tratamiento2 <- c(3, 5, 4, 3.3, 4, 4, 5, 4, 3, 5)

# Ejercicio 3
LIA <- c(88, 80, 90, 88, 92, 89, 98, 94, 91, 95, 90, 94)
LFA <- c(70, 77, 85, 84, 80, 88, 94, 90, 89, 99, 93, 93)

diferencia <- LIA - LFA
valor.esperado   <- 0

# promedio de la diferencia entre los tratamientos
promedio <- mean(diferencia)
promedio

n <- length(diferencia)
n

# La varianza de la diferencia entre los tratamientos
varianza <- ( sum(diferencia ^ 2) - (n * promedio ^ 2) ) / (n - 1)
varianza

# error estándar de la media de la diferencia
error.std <- sqrt(varianza / n)
error.std

# tCal
tCal <- (promedio - valor.esperado) / error.std
tCal

# tTablas
tTablas <- qt(0.01/2, df = n - 1, lower.tail = F)
tTablas

# Desicion de Hipotesis
abs(tCal) > tTablas

# t test
# Muestras
respuesta <- c(LIA, LFA)

grupos <- rep(c(1,2), each = n)
t.test1  <- t.test(respuesta~grupos, na.rm = T, mu = 0, alternative = "two.sided", paired = T, conf.level = 0.10)
t.test1

# Supuesto Normalidad
qqnorm(diferencia)
qqline(diferencia)
shapiro.test(diferencia)

