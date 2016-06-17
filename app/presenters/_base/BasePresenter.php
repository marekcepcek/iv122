<?php

namespace App\Presenters;

use App\ContextManager;
use App\Utils\Config;
use Nette;

abstract class BasePresenter extends Nette\Application\UI\Presenter
{
	/**
	 * @inject
	 * @var ContextManager
	 */
    public $contextManager;

	/**
	 * @inject
	 * @var Config
	 */
    public $config;


	public function beforeRender()
	{
		parent::beforeRender();

		$this->template->cssFiles = $this->getCssFilenames();
		$this->template->jsFiles = $this->getJsFilenames();

		$this->template->page = (object)[
			'description' => $this->getPageDescription(),
			'keywords' => $this->getPageKeywords(),
			'title' => $this->getPageTitle()
		];

		$this->template->navTabs = [
			(object)[
				'title' => 'Úvod',
				'presenter' => 'Homepage',
				'action' => 'default'
			],
			(object)[
				'title' => 'Čísla',
				'presenter' => 'Task',
				'action' => 'numbers'
			],
			(object)[
				'title' => 'Kombinatorika',
				'presenter' => 'Task',
				'action' => 'combinatorics'
			],
			(object)[
				'title' => 'Geometrie 1',
				'presenter' => 'Task',
				'action' => 'geometry1'
			],
			(object)[
				'title' => 'Geometrie 2',
				'presenter' => 'Task',
				'action' => 'geometry2'
			],
			(object)[
				'title' => 'Geometrie 3',
				'presenter' => 'Task',
				'action' => 'geometry3'
			],
		];
	}

	public function redirectBack()
	{
		$this->redirectUrl($this->getHttpRequest()->getHeader('referer') ? : $this->link('Homepage:default'));
	}

	/**
	 *
	 * @param string $varName
	 * @param mixed|null $defaultValue
	 */
	public function conf($varName, $defaultValue = null)
	{
		return $this->config->get($varName, $defaultValue);
	}

	/**
	 *
	 * @return array
	 */
	public function getJsFilenames()
	{
		return [
			'vendor/jquery-1.12.4.min',
			'vendor/bootstrap.min',
			'vendor/netteForms',
			'vendor/nette.ajax',
			'init',
			'scripts',
		];
	}

	/**
	 *
	 * @return array
	 */
	public function getCssFilenames()
	{
		return [
			'vendor/bootstrap.min',
			'vendor/bootstrap-theme.min',
			'style',
		];
	}

	public function getPageDescription()
	{
		return null;
	}

	public function getPageKeywords()
	{
		return null;
	}

	public function getPageTitle()
	{
		return 'Title';
	}

}
