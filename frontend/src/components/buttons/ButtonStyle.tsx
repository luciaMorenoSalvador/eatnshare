export type ButtonStyle = 'normal' | 'success' | 'danger' | 'warn'
export type ButtonSize = 'normal' | 'large'

export interface ButtonProps {
    outlined?: boolean
    color?: ButtonStyle,
    size?: ButtonSize
}

type ButtonStyles = {
    [key in ButtonStyle]: {
        [key in 'outlined' | 'filled']: string
    }
}

const baseStyle = 'transition duration-100 shadow-sm rounded-lg border-2 disabled:opacity-80 disabled:cursor-not-allowed disabled:shadow-none'

const styles: ButtonStyles = {
    'normal': {
        'filled': 'text-gray-100 bg-gray-800 border-gray-800 hover:bg-gray-900 hover:border-gray-900 hover:shadow-gray-700 disabled:hover:bg-gray-800 disabled:border-gray-800',
        'outlined': 'text-gray-800 border-gray-800 hover:bg-gray-900 hover:text-gray-100 hover:border-gray-900 hover:shadow-gray-700 disabled:hover:bg-transparent disabled:hover:text-gray-800 disabled:border-gray-800'
    },
    'success': {
        'filled': 'text-gray-100 bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700 hover:shadow-green-500 disabled:hover:bg-green-600 disabled:border-green-600',
        'outlined': 'text-green-600 border-green-600 hover:bg-green-700 hover:text-gray-100 hover:border-green-700 hover:shadow-green-500 disabled:hover:bg-transparent disabled:hover:text-green-600 disabled:border-green-600'
    },
    'danger': {
        'filled': 'text-gray-100 bg-red-800 border-red-800 hover:bg-red-900 hover:border-red-900 hover:shadow-red-700 disabled:hover:bg-red-800 disabled:border-red-800',
        'outlined': 'text-red-800 border-red-800 hover:bg-red-900 hover:text-gray-100 hover:border-red-900 hover:shadow-red-700 disabled:hover:bg-transparent disabled:hover:text-red-800 disabled:border-red-800'
    },
    'warn': {
        'filled': 'text-gray-100 bg-yellow-600 border-yellow-600 hover:bg-yellow-700 hover:border-yellow-700 hover:shadow-yellow-500 disabled:hover:bg-yellow-600 disabled:border-yellow-600',
        'outlined': 'text-yellow-600 border-yellow-600 hover:bg-yellow-700 hover:text-gray-100 hover:border-yellow-700 hover:shadow-yellow-500 disabled:hover:bg-transparent disabled:hover:text-yellow-600 disabled:border-yellow-600'
    }
}

export const getButtonStyle = (props: ButtonProps): string => {
    const colorStyle = styles[props.color || 'normal'][props.outlined ? 'outlined' : 'filled']
    const size = !props.size || props.size === 'normal' ? 'py-2 px-6' : 'py-3 px-10'

    return `${baseStyle} ${size} ${colorStyle}`
}
