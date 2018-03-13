library(crossdes)
set.seed(1)
bib <- find.BIB(trt = 20, b = 10, k =5)
bib

library(magrittr)
library(tidyr)
library(dplyr)
######## DISEÑO BIB en formato de datos ordenados
bloq <- 1:10
k <- 5
eva.project <- as.data.frame(bib) %>%
   gather(columna, trt) %>%  ## Unir todas las columnas en una sola columna
   mutate(did.evaluador = paste("Evaluador", as.factor(rep(bloq,k))),  # Asignar #persona
          id.proyecto= paste("Proyecto",as.factor(trt))) %>% # Asignar item a #revisar
   select(did.evaluador, id.proyecto) %>%  # Extraer solo las columnas mencionadas
   arrange(did.evaluador) # Ordenar en base al evaluador

head(eva.project)

####### SIMULACIÓN DE EVALUACIONES
set.seed(1)
Z <- model.matrix(~0+eva.project$did.evaluador)
X <- model.matrix(~0+eva.project$id.proyecto)
Betas <- c(rnorm(20,6,.75))
us <- rnorm(dim(Z)[2],sd=2)
y <- X%*%Betas+Z%*%us+rnorm(dim(X)[1],sd=0.2)

y[which(y>10)] <- 10

eva.project$calificacion <- round(y[1:length(y),],0)
datos <- eva.project
head(datos)

####### Tabla de ANDEVA #######
# install.packages("nlme")
library(nlme)
modelo <- lme(calificacion~id.proyecto, random = ~ 1 | did.evaluador, data = datos)
summary(modelo)

anova(modelo)

library(emmeans)
Ajuste <- emmeans(modelo, ~id.proyecto)

contrast(emmeans(modelo, pairwise ~ id.proyecto))$contrasts

# install.packages("multcompView")
cld(Ajuste, alpha = .05)
