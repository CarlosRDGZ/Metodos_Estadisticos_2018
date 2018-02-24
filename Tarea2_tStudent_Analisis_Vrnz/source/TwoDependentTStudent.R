# Values 1

# Operations

# mean x
x.mean <- mean(x)
n_x    <- length(x)
# variance x
S2.x   <- ( sum(x ^ 2) - (n_x * x.mean ^ 2) ) / (n_x - 1)
# stnd deviation
S_x    <- sqrt(S2.x / n_x)

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

