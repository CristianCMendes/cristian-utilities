import {Autocomplete, FormControlLabel, Grid, MenuItem, Switch, TextField} from "@mui/material";
import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {useCallback, useMemo, useState} from "react";

const defaultTestJson = {
	data: {
		object: {
			emptyObject: {},
			nullProp: null,
			emptyString: "",
			emptyArray: [],
			testObject: {name: "Test"}
		}
	},
	emptyObject: {},
	nullProp: null,
	emptyArray: [],
	emptyString: "",
	number: 23,
	boolean: true,
}

interface IOutputOptions {
	spaces: number
	method: 'minify' | 'pretty',
	quoted: {
		keys: boolean,
		strings: 'double' | 'single'
	}
	keySeparator: string
	valueSeparator: string
	removeNulls: boolean
	removeEmptyArrays: boolean
	removeEmptyObjects: boolean
	removeEmptyStrings: boolean
	stringOnly: boolean
}

export function JsonShaper() {
	const [input, setInput] = useState<string>(JSON.stringify(defaultTestJson, null, 2))
	const [options, setOptions] = useState<IOutputOptions>({
		keySeparator: ":",
		valueSeparator: ",",
		method: "pretty",
		quoted: {
			keys: true,
			strings: "double"
		},
		removeEmptyArrays: false,
		removeEmptyObjects: false,
		removeEmptyStrings: false,
		spaces: 2,
		removeNulls: false,
		stringOnly: false
	})

	// Trata de remover recursivamente todas as strings que são ""
	const removeEmptyStrings = useCallback((obj: any): any => {
		// Null só devolve
		if (obj == null) return obj

		// Se for string devolve null em caso vazia
		if (typeof obj === 'string') {
			return obj.trim() === '' ? null : obj
		}

		// Checa alimento por elemento quando o objeto é array
		if (Array.isArray(obj)) {
			return obj
				.map(item => removeEmptyStrings(item))
				.filter(item => item != null && !(typeof item === 'string' && item.trim() === ''))
		}

		// Caso de object processa as keys de forma recursiva
		if (typeof obj === 'object') {
			const current: any = {...obj}
			Object.keys(current).forEach(key => {
				const v = removeEmptyStrings(current[key])
				if (v == null || (typeof v === 'string' && v.trim() === '')) {
					delete current[key]
				} else {
					current[key] = v
				}
			})
			return current
		}

		// Outros, só devolve, sabe-se deus como chegou aqui...
		return obj
	}, [input, options.removeEmptyStrings])

	// Remove nulos recursivamente
	const removeNulls = useCallback((obj: any): object => {
		const current = {...obj}
		Object.keys(current).forEach(key => {
			if (current[key] == null) delete current[key]
			else if (typeof current[key] == "object" && !(current[key] instanceof Array)) {
				current[key] = removeNulls(current[key])
			}
		})
		return {...current}

	}, [input, options.removeNulls])

	// Remove objetos vazios recursivamente
	const removeEmptyObject = useCallback((obj: any): object => {
		const current = {...obj}
		Object.keys(current).forEach(key => {
			if (current[key] == null) return null

			if (typeof current[key] == "object" && !(current[key] instanceof Array)) {
				current[key] = removeEmptyObject(current[key])
			}

			if (current[key] && typeof current[key] === 'object' && !Array.isArray(current[key]) && Object.keys(current[key]).length === 0) {
				delete current[key]
			}
		})
		return {...current}

	}, [input, options.removeEmptyObjects])

	// Remove arrays vazios recursivamente
	const removeEmptyArrays = useCallback((obj: any): object => {
		const current = {...obj}
		Object.keys(current).forEach(key => {
			if (current[key] == null) return null

			if ((current[key] instanceof Array)) {
				if (current[key].length === 0) delete current[key]
			} else if (typeof current[key] == "object" && !(current[key] instanceof Array)) {
				current[key] = removeEmptyArrays(current[key])
			}
		})
		return {...current}

	}, [input, options.removeEmptyObjects])

	// Transforma tudo que for valor primitivo em string, recursivamente
	const castAllToString = useCallback((obj: any): object => {
		const current = {...obj}
		Object.keys(current).forEach(key => {
			if (current[key] == null) return null
			if (typeof current[key] == "object" && !(current[key] instanceof Array)) {
				current[key] = castAllToString(current[key])
			} else if (typeof current[key] != "string" && !(current[key] instanceof Array)) {
				current[key] = current[key].toString()
			}
		})

		return {...current}
	}, [input, options.stringOnly])

	// Checa se o input tá valido, trazendo o json dele caso seja
	const inputValid = useMemo(() => {
		try {
			const normalized = input.replace(/([\{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":')
			return JSON.parse(normalized)
		} catch {
			return undefined
		}
	}, [input]);

	// Memo do output final, baseado no input e nas regras
	const output = useMemo(() => {
		if (inputValid == null) return 'input não é um JSON valido'
		let current = inputValid

		if (options.removeNulls) {
			current = removeNulls(inputValid)
		}
		if (options.stringOnly) {
			current = castAllToString(current)
		}
		if (options.removeEmptyObjects) {
			current = removeEmptyObject(current)
		}
		if (options.removeEmptyArrays) {
			current = removeEmptyArrays(current)
		}
		if (options.removeEmptyStrings) {
			current = removeEmptyStrings(current)
		}

		// Define identação com base no método selecionado
		const isPretty = options.method === 'pretty'
		const indent = isPretty ? (options.spaces > 0 ? options.spaces : 1) : 0
		// Stringifica o objeto pra começar a transformar
		let stringified = JSON.stringify(current, null, indent)

		// Transforma o separador (dois pontos -> separador escolhido)
		// Espaço após o separador apenas no modo "pretty" (aceita 0+ espaços na detecção)
		stringified = stringified.replace(/":\s*/g, '"' + options.keySeparator + (isPretty ? ' ' : ''))

		// Escapa o separador num regex dinâmico
		const escapedSep = options.keySeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

		// Caso o usuário escolha chaves sem aspas, remova as aspas agora com base no separador atual
		if (!options.quoted.keys) {
			const spaceAfterSep = isPretty ? ' ' : ''
			stringified = stringified.replace(
				new RegExp(`"([A-Za-z_][A-Za-z0-9_]*)"${escapedSep}\\s*`, 'g'),
				`$1${options.keySeparator}${spaceAfterSep}`
			)
		}

		// Converter aspas duplas das strings de valores para simples, respeitando o separador atual
		if (options.quoted.strings === 'single') {
			stringified = stringified.replace(new RegExp(`${escapedSep}\\s*"([^"]*)"`, 'g'), (_m, group) => {
				// Alterar apenas aspas da string de valor
				return `${options.keySeparator}${isPretty ? ' ' : ''}'${group}'`;
			});
		}

		// Aplicar o separador de valores (entre propriedades do objeto)
		// Mantém os espaços/quebras originais após o separador
		const nextKeyPattern = `(?:"[A-Za-z_][A-Za-z0-9_]*"|[A-Za-z_][A-Za-z0-9_]*)${escapedSep}`
		const valueSepRegex = new RegExp(`,(\\s*)(?=\\s*${nextKeyPattern})`, 'g')
		stringified = stringified.replace(valueSepRegex, (_m, ws) => `${options.valueSeparator}${isPretty ? ws : ''}`)

		return stringified

	}, [input, options]);


	return (<DefaultContainer title={'Remodelador JSON'}>
		<Grid size={12} container spacing={1}>
			<Grid size={12}>
				<Grid size={12} container alignItems={'center'}>
					<FormControlLabel onChange={(_e, v) => setOptions({...options, stringOnly: v})}
					                  checked={options.stringOnly} control={<Switch/>}
					                  label={'Transformar tudo para strings'}/>
				</Grid>
				<Grid size={12} container alignItems={'center'}>
					<FormControlLabel onChange={(_e, v) => setOptions({...options, removeNulls: v})}
					                  checked={options.removeNulls} control={<Switch/>}
					                  label={'Remover nulos'}/>
				</Grid>
				<Grid size={12} container alignItems={'center'}>
					<FormControlLabel onChange={(_e, v) => setOptions({...options, removeEmptyStrings: v})}
					                  checked={options.removeEmptyStrings} control={<Switch/>}
					                  label={'Remover strings vazias'}/>
				</Grid>
				<Grid size={12} container alignItems={'center'}>
					<FormControlLabel onChange={(_e, v) => setOptions({...options, removeEmptyObjects: v})}
					                  checked={options.removeEmptyObjects} control={<Switch/>}
					                  label={'Remover objetos vazios'}/>
				</Grid>
				<Grid size={12} container alignItems={'center'}>
					<FormControlLabel onChange={(_e, v) => setOptions({...options, removeEmptyArrays: v})}
					                  checked={options.removeEmptyArrays}
					                  control={<Switch/>}
					                  label={'Remover arrays vazias'}/>
				</Grid>
				<Grid size={12} container alignItems={'center'}>
					<FormControlLabel
						onChange={(_e, v) => setOptions({...options, quoted: {...options.quoted, keys: v}})}
						checked={options.quoted.keys}
						control={<Switch/>}
						label={'Chaves entre aspas'}/>
				</Grid>
				<Grid size={12} container alignItems={'center'}>
					<TextField variant={'filled'}
					           label={'Aspas de strings'}
					           value={options.quoted.strings}
					           onChange={(e) => setOptions({
						           ...options,
						           quoted: {
							           ...options.quoted,
							           strings: e.target.value as IOutputOptions['quoted']['strings']
						           }
					           })} select>
						<MenuItem value={'double'}>Duplas ( " )</MenuItem>
						<MenuItem value={'single'}>Simples ( ' )</MenuItem>
					</TextField>
				</Grid>
				<Grid size={12} container alignItems={'center'}>
					<Autocomplete
						freeSolo
						value={options.keySeparator}
						disableClearable
						onChange={(_e, v) => setOptions(prev => {
							if (v == null)
								return prev

							return {
								...prev,
								keySeparator: v
							}
						})}
						disablePortal
						options={[':', '=']}
						fullWidth
						renderInput={(params) => <TextField variant={'filled'}
						                                    {...params}

						                                    label="Separador chave/valor"/>}
					/>
				</Grid>
				<Grid size={12} container alignItems={'center'}>
					<Autocomplete
						freeSolo
						value={options.valueSeparator}
						disableClearable
						onChange={(_e, v) => setOptions(prev => {
							if (v == null)
								return prev

							return {
								...prev,
								valueSeparator: v
							}
						})}
						disablePortal
						options={[',', ';', '|', " "]}
						fullWidth
						renderInput={(params) => <TextField variant={'filled'}
						                                    {...params}
						                                    label="Separador de propriedades"/>}
					/>
				</Grid>
				<Grid size={12} container alignItems={'center'}>
					<TextField variant={'filled'}
					           label={'Metodo'}
					           value={options.method}
					           onChange={(e) => setOptions({
						           ...options,
						           method: e.target.value as IOutputOptions['method']
					           })} select>
						<MenuItem value={'pretty'}>Visual (prettify)</MenuItem>
						<MenuItem value={'minify'}>Minimizado (minify)</MenuItem>
					</TextField>
				</Grid>

				<Grid size={12} container alignItems={'center'}>
					<TextField type={'number'}
					           variant={'filled'}
					           label={'Espaços de identação'}
					           disabled={options.method === 'minify'}
					           value={options.spaces}
					           onChange={(e) => setOptions(prev => {
						           const number = Number(e.target.value)

						           return {
							           ...prev,
							           spaces: number
						           }
					           })}/>
				</Grid>
			</Grid>
			<Grid size={6} container>
				<Grid size={12}>
					<TextField variant={'outlined'}
					           multiline={true}
					           value={input}
					           onChange={(e) => setInput(e.target.value)}
					/>
				</Grid>
			</Grid>

			<Grid size={6} container>
				<Grid size={12}>
					<TextField variant={'outlined'}
					           multiline={true}
					           value={output}/>
				</Grid>
			</Grid>
		</Grid>
	</DefaultContainer>)
}