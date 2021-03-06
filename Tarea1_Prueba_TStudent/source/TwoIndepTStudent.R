# Values 1
# x <- c(35, 23, 20, 25, 12, 17, 24, 22, 20, 28, 32, 30, 15, 19, 26)
# y <- c(32, 27, 23, 30, 15, 20, 21, 25, 23, 25, 29, 27, 18, 22, 29)

# Values 2
# x <- c(29, 10, 27, 8, 26, 11, 25, 7, 13, 9, 28, 24, 7, 22, 9)
# y <- c(9, 14, 11, 8, 15, 19, 21, 13, 10, 8, 17, 22, 19, 11, 7)

# Values 3
x <- c(17.6211, 16.6897, 15.4212, 14.5710,
       16.0258, 15.5761, 14.1005, 16.4496,
       15.1608, 16.3500, 15.9580, 18.2257,
       15.7624, 16.5477, 16.4090)
y <- c(11.1581, 8.3344, 14.9567, 7.8432,
       10.9840, 11.2624, 13.3290, 8.8406,
       8.5133, 11.0786, 5.7472, 9.3190,
       14.1809, 10.9265, 12.6853)

# Operations

# mean x
x.mean <- mean(x)
n_x    <- length(x)
# variance x
S2.x   <- ( sum(x ^ 2) - (n_x * x.mean ^ 2) ) / (n_x - 1)
# stnd deviation
S_x    <- sqrt(S2.x/n_x)

# mean y
y.mean <- mean(y)
n_y    <- length(y)
# variance y
S2.y   <- ( sum(y ^ 2) - (n_y * y.mean ^ 2) ) / (n_y - 1)
# stnd deviation
S_y    <- sqrt(S2.y/n_y)

mu0   <- 0
# Varianza Poblacional
S_p   <- sqrt( (((n_x - 1) * S2.x) + ((n_y - 1) * S2.y)) / (n_x + n_y - 2) )
# tCal
t_cal <- (x.mean - y.mean - mu0) / (S_p * sqrt((1/n_x) + (1/n_y)))
# tTablas
t_tab <- qt(0.5/2, df = n_x + n_y - 2, lower.tail = F)

# Desicion de Hipotesis
abs(t_cal) > t_tab

# t test
data  <- c(x, y)
grups <- rep(c(1,2), each = n_x)
test  <- t.test(data~grups, na.rm = T, mu = 0, alternative = "two.sided", var.equal = T, conf.level = 0.95)

# Supuesto Normalidad
qqnorm(data)
qqline(data)
shapiro.test(data)

x.mean
S2.x
y.mean
S2.y

S_p
t_cal
t_tab

test

