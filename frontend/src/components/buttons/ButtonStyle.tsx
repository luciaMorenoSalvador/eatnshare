export type ButtonStyle = 'normal' | 'success' | 'danger' | 'warn'

export interface ButtonProps {
    outlined?: boolean
    color?: ButtonStyle
}

type ButtonStyles = {
    [key in ButtonStyle]: {
        [key in 'outlined' | 'filled']: string
    }
}

const baseStyle = 'transition duration-100 shadow-md px-6 py-2 rounded-lg border-2'

const styles: ButtonStyles = {
    'normal': {
        'filled': 'text-gray-100 bg-gray-800 border-gray-800 hover:bg-gray-900 hover:border-gray-900',
        'outlined': 'text-gray-800 border-gray-800 hover:bg-gray-900 hover:text-gray-100 hover:border-gray-900'
    },
    'success': {
        'filled': 'text-gray-100 bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700',
        'outlined': 'text-green-600 border-green-600 hover:bg-green-700 hover:text-gray-100 hover:border-green-700'
    },
    'danger': {
        'filled': 'text-gray-100 bg-red-800 border-red-800 hover:bg-red-900 hover:border-red-900',
        'outlined': 'text-red-800 border-red-800 hover:bg-red-900 hover:text-gray-100 hover:border-red-900'
    },
    'warn': {
        'filled': 'text-gray-100 bg-yellow-600 border-yellow-600 hover:bg-yellow-700 hover:border-yellow-700',
        'outlined': 'text-yellow-600 border-yellow-600 hover:bg-yellow-700 hover:text-gray-100 hover:border-yellow-700'
    }
}

export const getButtonStyle = (props: ButtonProps): string => {
    const colorStyle = styles[props.color || 'normal'][props.outlined ? 'outlined' : 'filled']
    return `${baseStyle} ${colorStyle}`
}
