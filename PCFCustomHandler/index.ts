import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CustomButton } from './CustomButton';

export class PCFCustomHandler implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private container: HTMLDivElement;

	constructor() {

	}

	public init(context: ComponentFramework.Context<IInputs>,
		notifyOutputChanged: () => void,
		state: ComponentFramework.Dictionary,
		container: HTMLDivElement) {
		this.container = container;

		const scriptUrl = context.parameters.WebResource.raw!;
		const callBackName = context.parameters.MethodName.raw!;

		let scriptNode = document.createElement("script");
		scriptNode.setAttribute("type", "text/javascript");
		scriptNode.setAttribute("src", scriptUrl);
		scriptNode.onload = () => {
			//Add code that will be executed once the external code is loaded
			const btnControl = React.createElement(CustomButton, {
				label: context.parameters.ButtonLabel.raw!,
				clickHandler: () => {
					const dynamicFunctionCall = new Function(callBackName + "()");
	
					try {
						dynamicFunctionCall();
					} catch (error) {
						console.error(error);
					}
				}
			});

			ReactDOM.render(btnControl, this.container);
		};
		scriptNode.onerror = (error) => {
			container.innerText = "Can't load referenced script";
		};

		document.head.appendChild(scriptNode);
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
	}

	public getOutputs(): IOutputs {
		return {};
	}

	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this.container);
	}
}