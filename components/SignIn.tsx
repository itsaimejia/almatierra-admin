import { Button, Center, createStyles, Divider, Space, Stack, Title, TextInput, Group, Text, Anchor, PasswordInput, Alert, Notification } from '@mantine/core'
import { IconAt, IconLockOpen, IconBrandGmail, IconBrandFacebook, IconAlertCircle } from '@tabler/icons';
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import router, { useRouter } from 'next/router'
import SingUp from './SignUp';


const useStyles = createStyles(() => ({
    container: {
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%'
    },
    form: {
        width: 400,
        backgroundColor: 'rgba(155, 150, 150, 0.13)',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        borderRadius: 10,
        backdropFilter: 'blur(10)',
        border: '2 solid rgba(255,255,255,0.1)',
        boxShadow: '0 0 40 rgba(8,7,16,0.6)',
        padding: '20px 35px'

    },
}))


const SingIn = () => {
    const router = useRouter()
    const { user, login, logout } = useAuth()
    const { classes } = useStyles()
    const [register, setRegister] = useState(false)
    const [error, setError] = useState('')
    const [resetPassword, setResetPassword] = useState(false)
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },

        validate: {
            email: (value) => ((/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value) && value.trim().length != 0) ? null : (<Alert icon={<IconAlertCircle size={16} />} title="Ingresa un correo válido" color="red" radius="md" variant="outline">
                {'Ejemplo: correo@dominio.com'}
            </Alert>)),
            password: (value) => (value.trim().length >= 5 ? null : (<Alert icon={<IconAlertCircle size={16} />} title="Ingresa una contraseña válida" color="red" radius="md" variant="outline">
                Debe incluir mínimo 5 carácteres
            </Alert>))
        },
    });

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            handleLogin()
        }
    }

    const handleLogin = async () => {
        if (!form.validate().hasErrors) {
            await login(form.values.email.toLowerCase(), form.values.password).then((result: any) => {
                console.log(result)
                router.push('/')
            }).catch((err: any) => {
                console.log(Object.values(err)[0])
                if (Object.values(err)[0] === 'auth/wrong-password') {
                    setError('Contraseña incorrecta')

                }
                if (Object.values(err)[0] === 'auth/user-not-found') {
                    setError('Usuario no encontrado')
                }
            });
        }
    }

    return <>
        {register ? (<SingUp />) : (<div className={classes.container}>
            <div className={classes.form}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack>
                        <Center><Title order={3} sx={(theme) => ({
                            color: theme.colorScheme === 'dark' ? 'white' : 'black',
                        })}>Iniciar sesión</Title></Center>
                        <Divider />
                        <Space />
                        <TextInput
                            label='Correo'
                            withAsterisk
                            icon={<IconAt />}
                            placeholder="correo@dominio.com"
                            radius="xs"
                            size="md"
                            onKeyPress={keyDownHandler}
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput label='Contraseña' withAsterisk icon={<IconLockOpen />} radius='xs' size="md" placeholder="Ingresa una contraseña" {...form.getInputProps('password')} onKeyPress={keyDownHandler} />

                        <Space />
                        {error.trim().length === 0 ? null : (<Alert icon={<IconAlertCircle size={16} />} title="Error al ingresar" color="red">
                            {error}
                        </Alert>)}
                        <Button color={'green'} onClick={() => handleLogin()}><Text size="sm" weight={500}>
                            Ingresar
                        </Text></Button>
                        <Group position="apart" grow mb={5}>
                            <Button disabled color={'red'} leftIcon={<IconBrandGmail />}>Gmail</Button>
                            <Button disabled leftIcon={<IconBrandFacebook />}>Facebook</Button>
                        </Group>

                        {error.includes('Contraseña') ? (<Notification title="Olvidaste tu contraseña?" onClose={() => setResetPassword(false)}>
                            <Button variant="subtle" radius="xs" size="xs" disabled compact onClick={() => setResetPassword(true)}>
                                Recuperar contraseña
                            </Button>
                        </Notification>) : null}

                        <Divider />
                        <Button color={'blue'} onClick={() => setRegister(true)}><Text size="sm" weight={500} >
                            Crear nueva cuenta
                        </Text></Button>
                    </Stack>
                </form>
            </div>
        </div>)}
    </>
}

export default SingIn