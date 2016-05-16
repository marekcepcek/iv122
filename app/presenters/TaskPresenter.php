<?php

namespace App\Presenters;

class TaskPresenter extends BasePresenter
{
	public function getJsFilenames()
	{
		$jsFilenames = [
			'point',
			'vector',
			'line',
			'bitmapImage',
			$this->action,
		];

//		switch ($this->action) {
//			case 'numbers':
//				$jsFilenames = [
//
//				];
//		}

		return array_merge(parent::getJsFilenames(), $jsFilenames);
	}
}
