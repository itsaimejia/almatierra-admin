import { Button, createStyles, Divider, Space, Stack, Center, Title, Group, Text, PasswordInput, TextInput, Alert, ActionIcon, Tooltip, Notification } from '@mantine/core'
import { useForm } from '@mantine/form';
import { IconAt, IconLockOpen, IconAlertCircle, IconArrowBackUp } from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react'
import { useAuth } from '../context/AuthContext';
import SingIn from './SignIn';
import { useState } from 'react';


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
}));
const SingUp = () => {

    const router = useRouter()
    const { createUser } = useAuth()
    const [backToSignin, setBackToSignin] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },

        validate: {
            email: (value) => ((/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value) && value.trim().length != 0) ? null : (<Alert icon={<IconAlertCircle size={16} />} title="Ingresa un correo válido" color="red" radius="md" variant="outline">
                {'Ejemplo: correo@dominio.com'}
            </Alert>)),
            password: (value) => (value.trim().length >= 5 ? null : (<Alert icon={<IconAlertCircle size={16} />} title="Ingresa una contraseña" color="red" radius="md" variant="outline">
                El campo no puede estar vacio
            </Alert>))
        },
    });

    const handleRegister = async () => {
        if (!form.validate().hasErrors) {
            await createUser(form.values.email.toLowerCase(), form.values.password).then((result: any) => {
            }).catch((err: any) => {
                console.log(Object.values(err)[0])
                if (Object.values(err)[0] === 'auth/email-already-in-use') {
                    setError('El correo ya se encuentra registrado')
                }
                if (Object.values(err)[0] === 'auth/user-not-found') {
                    setError('Usuario no encontrado')
                }
            });
            setLoading(false)

        }
    }

    const { classes } = useStyles()

    return <>
        {backToSignin ? (<SingIn />) : (<div className={classes.container}>
            <div className={classes.form}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack>
                        <Group>
                            <Tooltip label='Regresar a inicio de sesion'>
                                <ActionIcon onClick={() => setBackToSignin(true)}>
                                    <IconArrowBackUp size={18} />
                                </ActionIcon>
                            </Tooltip>
                            <Center><Title order={3} sx={(theme) => ({
                                color: theme.colorScheme === 'dark' ? 'white' : 'black',
                            })}>Registrarse</Title></Center>
                        </Group>
                        <Divider />
                        <Space />
                        <TextInput
                            label='Ingresa un correo'
                            withAsterisk
                            icon={<IconAt />}
                            placeholder="correo@ejemplo.com"
                            radius="xs"
                            size="md"
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput label='Ingresa una contraseña' withAsterisk icon={<IconLockOpen />} radius='xs' size="md" placeholder="Contraseña" {...form.getInputProps('password')} />
                        {error.trim().length === 0 ? null : (<Alert icon={<IconAlertCircle size={16} />} title="Error al registrarse" color="red">
                            {error}

                        </Alert>)}
                        <Space />
                        <Button color={'green'} onClick={() => handleRegister()}><Text size="sm" weight={500} >
                            Registrar
                        </Text></Button>

                    </Stack>
                </form>

            </div>
        </div>)}
    </>
}

export default SingUp