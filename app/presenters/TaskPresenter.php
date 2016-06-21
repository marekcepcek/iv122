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
			'circle',
			'polygon',
			'text',
			'bitmapImage',
			'vectorImage',
			'turtle',
			'lSystem',
			'matrix',
			'transformation',
			$this->action,
		];

		return array_merge(parent::getJsFilenames(), $jsFilenames);
	}
}
