import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as S from './styled'
import * as yup from 'yup';

const formSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  adress: yup.string().required('Endereço é obrigatório'),
  tel: yup.string().required('Telefone é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  birthDate: yup.date().required('Data de Nascimento é obrigatório'),
});

export default function App() {
  const [data, setData] = useState({
    name: '',
    adress: '',
    tel: '',
    email: '',
    birthDate: '',
  });
  const [errors, setErrors] = useState({});
console.log("data", data.email);
  const handleChange = (e) => {
    const name = e.target.name;
    let newValue = e.target.value;
    if (name === 'name') newValue = newValue.replace(/[^a-zA-Z]/g, '');
    if (name === 'tel') newValue = newValue.slice(0, 11).replace(/[^0-9]/g, '');
    setData({ ...data, [name]: newValue });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        alert("DADOS CADASTRADOS")
      })
      .catch((err) => {
        console.log('Formulário inválido');
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  return (
    <S.Container>
      <S.Main>
        <S.Form onSubmit={handleSubmit}>
          <h1>CADASTRO</h1>
          <S.InputArea>
            <TextField
              fullWidth
              id="outlined-name"
              label="Nome"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </S.InputArea>
          <S.InputArea>
            <TextField
              fullWidth
              id="outlined-adress"
              label="Endereço"
              name="adress"
              value={data.adress}
              onChange={handleChange}
              error={Boolean(errors.adress)}
              helperText={errors.adress}
            />
          </S.InputArea>
          <S.InputArea>
              <TextField
                fullWidth
                id="outlined-tel"
                label="DDD+Telefone"
                name="tel"
                type="tel"
                value={data.tel.slice(0, 11)}
                onChange={handleChange}
                error={Boolean(errors.tel)}
                helperText={errors.tel}
              />
          </S.InputArea>
          <S.InputArea>
            <TextField
              fullWidth
              id="outlined-email"
              label="Email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              onBlur={(event) => {
                if (!validateEmail(event.target.value)) {
                  setErrors({ ...errors, email: "Formato de email inválido" });
                } else {
                  setErrors({ ...errors, email: "" });
                }
              }}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </S.InputArea>
          <S.InputArea>
            <TextField
              fullWidth
              id="outlined-birthDate"
              name="birthDate"
              type="date"
              value={data.birthDate}
              onChange={handleChange}
              error={Boolean(errors.birthDate)}
              helperText={errors.birthDate && "Data Inválida"}
            />
          </S.InputArea>
          <S.ButtonWrapper>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Enviar
            </Button>
          </S.ButtonWrapper>
        </S.Form>
      </S.Main>
    </S.Container>
  );
}