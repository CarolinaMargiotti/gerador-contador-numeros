import { useEffect, useState } from "react";
import { Container, Form, Button, FormGroup } from "reactstrap";
import Hooks from "./hooks";

function App() {
    const [numeros, setNumeros] = useState([]);
    const [contagem, setContagem] = useState([]);
    const { list, save, reset } = Hooks();

    useEffect(() => {
        generateNumbers();
        retrieveContagem();
    }, []);

    const retrieveContagem = async () => {
        const registros = await list();
        setContagem(registros);
    };

    const saveCount = async (value) => {
        await save(value);
        retrieveContagem();
    };

    const resetCount = async () => {
        await reset();
        retrieveContagem();
    };

    const findCount = (value) => {
        let num = 0;
        contagem.forEach((element) => {
            const { number, count } = element;
            if (number === value) {
                num = count;
            }
        });
        return num;
    };

    const generateNumbers = () => {
        let random;
        let numerosGerados = [];
        while (numerosGerados.length !== 5) {
            random = Math.floor(Math.random() * 9) + 1;

            if (!numerosGerados.includes(random)) {
                numerosGerados.push(random);
            }
        }
        setNumeros(numerosGerados);
    };

    return (
        <div style={{ fontFamily: "Roboto" }} className="m-5 ">
            <Container>
                <h1 className="text-white mb-4 border-bottom border-white border-2">
                    Contagem de números
                </h1>
                <Form>
                    <div className="row">
                        <div className="col " />
                        <div className="col ">
                            <FormGroup>
                                <Container>
                                    <div className="row extraButtonRow justify-content-center ">
                                        <Button
                                            className="col col-auto fs-5 mb-3"
                                            onClick={() => {
                                                generateNumbers();
                                            }}
                                        >
                                            Gerar novos números
                                        </Button>
                                        <div className="col col-auto" />
                                        <Button
                                            className="col col-auto fs-5 mb-2"
                                            onClick={() => {
                                                resetCount();
                                            }}
                                        >
                                            Resetar
                                        </Button>
                                    </div>
                                </Container>
                            </FormGroup>
                            <FormGroup>
                                <div
                                    className="numberButtonRow justify-content-between"
                                    style={{ width: "25rem" }}
                                >
                                    {numeros.map((item, index) => (
                                        <Button
                                            size="lg"
                                            style={{
                                                backgroundColor: "#6254FF",
                                                borderColor: "#6254FF",
                                            }}
                                            onClick={() => saveCount(item)}
                                        >
                                            {item} : {findCount(item)}
                                        </Button>
                                    ))}
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col" />
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default App;
