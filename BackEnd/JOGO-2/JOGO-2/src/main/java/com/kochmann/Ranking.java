package com.kochmann;


import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.OneToOne;


@Entity
public class Ranking implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int pontos;
	private String nivel;
	@OneToOne
	private Usuario usuario;
	
	
	public Ranking() {
		super();
	}


	public Ranking(int id, int pontos, String nivel, Usuario usuario) {
		super();
		this.id = id;
		this.pontos = pontos;
		this.nivel = nivel;
		this.usuario = usuario;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getPontos() {
		return pontos;
	}


	public void setPontos(int pontos) {
		this.pontos = pontos;
	}


	public String getNivel() {
		return nivel;
	}


	public void setNivel(String nivel) {
		this.nivel = nivel;
	}


	public Usuario getUsuario() {
		return usuario;
	}


	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
	
}

