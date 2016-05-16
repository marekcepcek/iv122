<?php

namespace App;

use Nette\DI\Container;
use Nette\InvalidStateException;
use Nette\Object;

class ContextManager extends Object
{
	/** @var Container */
	protected $container;

	/** @var static */
	protected static $instance = null;

	public function __construct(Container $container)
	{
		$this->container = $container;

		self::$instance = $this;
	}

	/**
	 *
	 * @return static
	 * @throws InvalidStateException
	 */
	public static function getInstance()
	{
		if (self::$instance === null) {
			throw new InvalidStateException('ContextManager instance not initialized!');
		}

		return self::$instance;
	}

	/**
	 *
	 * @param string $serviceName
	 * @return mixed
	 */
	public static function getService($serviceName)
	{
		return self::getInstance()->container->getService($serviceName);
	}

	/**
	 *
	 * @param string $serviceName
	 * @return boolean
	 */
	public static function hasService($serviceName)
	{
		return self::getInstance()->container->hasService($serviceName);
	}

	/**
	 *
	 * @param string $class
	 * @return mixed
	 */
	public static function getByType($class)
	{
		return self::getInstance()->container->getByType($class);
	}
}