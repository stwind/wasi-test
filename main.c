#define EXPORT(NAME) __attribute__((export_name(#NAME))) NAME
#define IMPORT(NAME) __attribute__((import_module("env"), import_name(#NAME))) NAME

int EXPORT(add)(int a, int b) {
    return a + b;
}