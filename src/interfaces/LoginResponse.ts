export interface LoginResponse {
    ok:      boolean;
    msg:     string;
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    name:            string;
    paternalSurname: string;
    maternalSurname: string;
    phone:           string;
    email:           string;
    password:        string;
    rol:             string;
    id:              string;
}
