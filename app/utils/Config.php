<?php

namespace App\Utils;

use Nette\DI\Container;
use Nette\InvalidStateException;
use Nette\Object;

class Config extends Object
{
	protected $parameters = null;

	public function __construct(Container $container)
	{
		$this->parameters = $container->getParameters();
	}

	public function get($varName, $defaultValue = null)
	{
		if ($this->parameters === null) {
			throw new InvalidStateException("Config not loaded correctly!");
		}

		if (($varName = trim($varName)) == '') {
			if ($defaultValue === null) {
				trigger_error("Empty variable 'varName' and null variable 'defaultValue'.");
			}
			return $defaultValue;
		}

		if (defined($varName)) {
			return constant($varName);
		}

		$configValue = $this->parameters;

		$configKeys = array_map('trim', explode('.', $varName));
		foreach ($configKeys as $configKey) {

			if (is_array($configValue) && isset($configValue[$configKey])) {
				$configValue = $configValue[$configKey];
			} else if ($defaultValue !== null) {
				return $defaultValue;
			} else {
				trigger_error("Unknown config variable '" . $varName . "' and null variable 'defaultValue'.");
				return null;
			}
		}

		return $configValue;
	}

}