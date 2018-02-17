# Values 1
# x <- c(20, 30, 25, 20, 30, 50, 25, 20, 20, 30, 25, 40, 50, 35, 20)
# mu0 <- 25

# Values 2
# x <- c(5, 2, 9, 7, 4, 5, 6, 7, 7, 10, 5, 6, 5, 4, 5, 8, 6, 6, 3, 6, 7, 3, 6)
# mu0 <- 8

# Values 3
x <- c(61, 64, 68, 67, 70, 73, 76, 78, 81, 67, 70, 73, 66, 74, 77, 80, 85, 75, 72, 78, 77, 80)
mu0 <- 75

# mean
x.mean <- mean(x)
n <- length(x)

# variance
sigma2 <- ( sum(x ^ 2) - (n * x.mean ^ 2) ) / (n - 1)

# standard deviation
sigma_x <- sqrt(sigma2 / n)

# tcal
t_cal <- (x.mean - mu0) / sigma_x

# ttablas
t_tab <- qt(0.05/2, df = n - 1, lower.tail = F)

# Hipostesis. Si |t_cal| >  t_tablas: Rechaszo H_0
abs(t_cal) > t_tab

# t-Student One Sample Test
test <- t.test(x, mu = mu0, alternative = "two.sided", conf.level = 0.95)

# Supuesto de normalidad
qqnorm(x)
qqline(x)
shapiro.test(x)