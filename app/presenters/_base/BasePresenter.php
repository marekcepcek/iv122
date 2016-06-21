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


	protected $title = '';


	public function beforeRender()
	{
		parent::beforeRender();

		$this->template->cssFiles = $this->getCssFilenames();
		$this->template->jsFiles = $this->getJsFilenames();

		$this->template->navTabs = $navTabs = [
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
				'title' => 'Kombinátorika',
				'presenter' => 'Task',
				'action' => 'combinatorics'
			],
			(object)[
				'title' => 'Geometria',
				'subTabs' => [
					(object)[
						'title' => 'Želví grafika',
						'presenter' => 'Task',
						'action' => 'geometry1'
					],
					(object)[
						'title' => 'Bitmapy',
						'presenter' => 'Task',
						'action' => 'geometry2'
					],
					(object)[
						'title' => 'Základné algoritmy',
						'presenter' => 'Task',
						'action' => 'geometry3'
					],
				]
			],
			(object)[
				'title' => 'Fraktály',
				'subTabs' => [
					(object)[
						'title' => 'Chaos',
						'presenter' => 'Task',
						'action' => 'chaos'
					],
					(object)[
						'title' => 'Komplexné čísla',
						'presenter' => 'Task',
						'action' => 'complex'
					],
				]
			],
			(object)[
				'title' => 'Transformácie',
				'presenter' => 'Task',
				'action' => 'transform'
			],
			(object)[
				'title' => 'Pravdepodobnosť',
				'presenter' => 'Task',
				'action' => 'probability'
			],
			(object)[
				'title' => 'Analýza',
				'presenter' => 'Task',
				'action' => 'analysis'
			],
			(object)[
				'title' => 'Bludiská',
				'subTabs' => [
					(object)[
						'title' => 'Riešenie',
						'presenter' => 'Task',
						'action' => 'graphs'
					],
					(object)[
						'title' => 'Generovanie',
						'presenter' => 'Task',
						'action' => 'maze'
					],
				]
			],
		];

		foreach ($navTabs as $navTab) {
			$navTab->active = false;

			if (isset($navTab->subTabs)) {

				foreach ($navTab->subTabs as $subTab) {
					$subTab->active = false;
					if ($this->name == $subTab->presenter && $this->action == $subTab->action) {
						$navTab->active = true;
						$subTab->active = true;
						$this->title = $subTab->title;
					}
				}
			} else {
				if ($this->name == $navTab->presenter && $this->action == $navTab->action) {
					$navTab->active = true;
					$this->title = $navTab->title;
				}
			}
		}

		$this->template->page = (object)[
			'description' => $this->getPageDescription(),
			'keywords' => $this->getPageKeywords(),
			'title' => $this->getPageTitle()
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
		return 'IV122 | '.$this->title;
	}

}
