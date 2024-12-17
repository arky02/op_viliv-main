// tailwind config is required for editor support
import type { Config } from 'tailwindcss'
import { sharedConfig } from '@configs/tailwindcss'

const config: Pick<Config, 'presets'> = {
	presets: [sharedConfig] as Config['presets']
}

export default config
