# install.packages("crossdes")
# install.packages("magrittr")
# install.packages("tidyr")
# install.packages("dplyr")
library(crossdes)
library(magrittr)
library(tidyr)
library(dplyr)
set.seed(1)
bib <- find.BIB(trt = 12, b = 6, k = 5)
bib

######## DISEÑO BIB en formato de datos ordenados
bloq <- 1:6
k <- 5
Eval_Proyect <- as.data.frame(bib) %>%
   gather(columna, trt) %>%  ## Unir todas las columnas en una sola columna
   mutate(Id_Evaluador = paste("Evaluador", as.factor(rep(bloq,k))),  # Asignar #evaluador
          Id_Proyecto= paste("Proyecto",as.factor(trt))) %>% # Asignar proyecto a #revisar
   select(Id_Evaluador, Id_Proyecto) %>%  # Extraer solo las columnas mencionadas
   arrange(Id_Evaluador) # Ordenar en base al evaluador

head(Eval_Proyect)

####### SIMULACIÓN DE EVALUACIONES
set.seed(1)
Z <- model.matrix(~0+Eval_Proyect$Id_Evaluador)
X <- model.matrix(~0+Eval_Proyect$Id_Proyecto)
Betas <- c(rnorm(12,6,0.75))
us <- rnorm(dim(Z)[2],sd=2)
y <- X%*%Betas+Z%*%us+rnorm(dim(X)[1],sd=0.2)

y[which(y>10)] <- 10

Eval_Proyect$Calificacion <- round(y[1:length(y),],0)
datos <- Eval_Proyect
head(datos)

####### Tabla de ANDEVA #######
# install.packages("nlme")
library(nlme)
modelo <- lme(Calificacion~Id_Proyecto, random = ~ 1 | Id_Evaluador, data = datos)
summary(modelo)

anova(modelo)

# install.packages("emmeans")
library(emmeans)
Ajuste <- emmeans(modelo, ~Id_Proyecto)
Ajuste

contrast(emmeans(modelo, pairwise ~ Id_Proyecto))$contrasts

# install.packages("multcompView")
cld(Ajuste, alpha = .05)
