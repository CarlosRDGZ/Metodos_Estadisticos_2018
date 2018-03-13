library(crossdes)
set.seed(1)
bib <- find.BIB(trt = 16, b = 8, k =4)
bib

######## DISEÑO BIB en formato de datos ordenados
bloq <- 1:8
k <- 4
eval.project <- as.data.frame(bib) %>%
   gather(columna, trt) %>%  ## Unir todas las columnas en una sola columna
   mutate(id.evaluador = paste("Evaluador", as.factor(rep(bloq,k))),  # Asignar #persona
          id.proyecto= paste("Proyecto",as.factor(trt))) %>% # Asignar item a #revisar
   select(id.evaluador, id.proyecto) %>%  # Extraer solo las columnas mencionadas
   arrange(id.evaluador) # Ordenar en base al evaluador

head(eval.project)

####### SIMULACIÓN DE EVALUACIONES
set.seed(1)
Z <- model.matrix(~0+eval.project$id.evaluador)
X <- model.matrix(~0+eval.project$id.proyecto)
Betas <- c(rnorm(16,6,.75))
us <- rnorm(dim(Z)[2],sd=2)
y <- X%*%Betas+Z%*%us+rnorm(dim(X)[1],sd=0.2)

y[which(y>10)] <- 10

eval.project$Calificacion <- round(y[1:length(y),],0)
datos <- eval.project
head(datos)

####### Tabla de ANDEVA #######
# install.packages("nlme")
library(nlme)
modelo <- lme(Calificacion~id.proyecto, random = ~ 1 | id.evaluador, data = datos)
summary(modelo)

anova(modelo)

library(emmeans)
Ajuste <- emmeans(modelo, ~id.proyecto)

contrast(emmeans(modelo, pairwise ~ id.proyecto))$contrasts

# install.packages("multcompView")
cld(Ajuste, alpha = .05)
